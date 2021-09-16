const {Router} = require('express'); 
const router = Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const privateRoute = require("../middleware/privateRoute")

router.post("/login",(req,res,next) => {
  let usuario;
  User.findOne({nombre:req.body.nombre}).then(user => {
    usuario = user;
    return  bcrypt.compare(req.body.password, user.password);
  })
  .then(passwordValidated => {
    const token = jwt.sign({_id:usuario.id}, process.env.SECRET,{
      expiresIn: 60 * 60 * 24 * 10
    })
    const existedUser = req.body.nombre === usuario.nombre;
    passwordValidated  && existedUser ?
    res.send({
      nombre : usuario.nombre,
      email : usuario.email,
      tiendas : usuario.tiendas,
      token
    })
    :
    res.status(400).send("Error en el usuario").end();
  })
  .catch(err => next(err));
})

router.post("/register", (req,res,next) => {
  // Registro
  console.log(req.body);
  const hashPassword = bcrypt.hashSync(req.body.password, 8);
  const newUser = new User({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    password: hashPassword,
    edad : req.body.edad,
    favoritos : req.body.favoritos,
    dni : req.body.dni,
    sexo : req.body.sexo
})
  newUser.save()
    .then((user) => res.send(user).end()
    )
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

router.get("/usuarios/:id",privateRoute,(req,res,next) => {
  const {id} = req.params
  User.findById(id)
  .then(user => res.json(user).end())
  .catch(err => next(err))
})

router.put("/usuarios/:id",privateRoute,(req,res,next) => {
  const {id} = req.params;
  const updateUser = {
    nombre: req.body.nombre,
    password: req.body.password,
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