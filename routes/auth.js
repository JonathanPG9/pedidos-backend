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
  User.findOne({email:req.body.email}).then(user => {
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
      tiendas : usuario.tiendas,
      userId : usuario.id,
      token
    })
    :
    res.status(404).send("Datos Erroneos").end();
  })
  .catch(err => next(err));
})

router.post("/register", (req,res,next) => {
  // Validacion
  const {error} = validationRegister(req.body) 
  if(error) return res.status(401).json(error.details[0].message)
  User.findOne({email:req.body.email})
  .then(existe =>  {
    if(existe) return res.status(400).send("Error Email registrado")
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
    nombre: 1,
    origen: 1
  })
  .then(users => res.json(users).end())
  .catch(err => next(err))
})

router.get("/usuarios/:id",(req,res,next) => {
  const {id} = req.params
  User.findById(id).populate('tiendas',{
    nombre: 1,
    origen: 1
  })
  .then(user => res.json(user).end())
  .catch(err => next(err))
})

router.put("/usuarios/:id",privateRoute,(req,res,next) => {
  const {id} = req.params;
  const updateUser = {
    nombre: req.body.nombre,
    password: req.body.password,
    email:req.body.email,
    apellido: req.body.apellido,
    telefono:req.body.telefono,
  }
  User.findByIdAndUpdate(id,updateUser, {new : true})
  .then(userUpdated => res.json(userUpdated).end())
  .catch(err => next(err))
})

router.delete("/usuarios/:id",privateRoute,(req,res,next) => {
  console.log(id);
  User.findByIdAndRemove(id)
  .then(userRemoved => res.json(userRemoved).end())
  .catch(err => next(err))
})

module.exports = router;