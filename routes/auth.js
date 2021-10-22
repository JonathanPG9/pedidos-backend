const {Router} = require('express'); 
const router = Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const privateRoute = require("../middleware/privateRoute")
const { validationRegister,validationLogin } = require("../modelsJoi/validateData")

router.post("/login",(req,res,next) => {
  const {error} = validationLogin(req.body) 
  if(error) return res.status(401).json(error.details[0].message)
/// Usuario
  let usuario;
  User.findOne({email:req.body.email}).populate('tiendas',{
    nombre : 1,
    comidas : 1,
    nombreProductos: 1,
    descripcion : 1,
    barrio : 1,
    categorias : 1,
    foto:1,
  })
  .then(user => {
    usuario = user;
    return  bcrypt.compare(req.body.password, usuario.password);
  })
  .then(passwordValidated => {
    const token = jwt.sign({_id:usuario.id}, process.env.SECRET,{
      expiresIn: 60 * 60 * 24 * 10
    })
    passwordValidated ?
    res.status(200).send({
      nombre : usuario.nombre,
      email : usuario.email,
      telefono : usuario.telefono,
      apellido : usuario.apellido,
      tiendas : usuario.tiendas,
      userId : usuario.id,
      token
    })
    :
    res.status(404).send("Email y/o password invalidos").end();
  })
  .catch(err => next(err));
})

router.post("/register", async (req,res,next) => {
  // Validacion
  const {error} = validationRegister(req.body) 
  if(error) return res.status(401).json(error.details[0].message)
  const emailExisted = await User.findOne({email:req.body.email})
  if(emailExisted) return res.status(400).send("Error Email registrado").end()
  User.findOne({email:req.body.email})
  .then(existe =>  {
    if(existe) return res.status(400).json("Error Email registrado")
  })
  // Registro
  const hashPassword = bcrypt.hashSync(req.body.password, 8);
  const newUser = new User({
    nombre: req.body.nombre.toLowerCase(),
    apellido: req.body.apellido,
    email: req.body.email,
    password: hashPassword,
    edad : req.body.edad,
    favoritos : req.body.favoritos,
    dni : req.body.dni,
    sexo : req.body.sexo,
    telefono : req.body.telefono
})
  newUser.save()
    .then((user) => res.send(user).end())
    .catch(err => next(err))
})

router.get("/usuarios",(req,res,next) => {
  User.find().populate('tiendas',{
    nombre : 1,
    comidas : 1,
    nombreProductos: 1,
    descripcion : 1,
    barrio : 1,
    categorias : 1,
    foto:1,
  })
  .then(users => res.json(users).end())
  .catch(err => next(err))
})

router.get("/usuarios/:id",(req,res,next) => {
  const {id} = req.params
  User.findById(id).populate('tiendas',{
    nombre : 1,
    comidas : 1,
    nombreProductos: 1,
    descripcion : 1,
    barrio : 1,
    categorias : 1,
    foto:1,
  })
  .then(user => res.json(user).end())
  .catch(err => next(err))
})

router.put("/usuarios/:id",async (req,res) => {
  const {id} = req.params;
  const updateUser = {
    nombre: req.body.nombre,
    email: req.body.email,
    apellido: req.body.apellido,
    telefono: req.body.telefono,
  }
  try{
    const updated = await User.findByIdAndUpdate(id,updateUser, {new : true})
    const {nombre,apellido,email,telefono} = updated;
    return res.status(200).send({nombre,apellido,email,telefono}).end()
  }
  catch(err) {
    return res.status(404).send("ID invalido").end()
  } 
})

router.delete("/usuarios/:id",privateRoute,(req,res,next) => {
  const {id} = req.params;
  User.findByIdAndRemove(id)
  .then(userRemoved => {
    return res.status(200).json(userRemoved).end()
  })
  .catch(err => res.status(404).send("No existe tienda").end())
})

module.exports = router;