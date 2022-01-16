const {Router} = require('express'); 
const router = Router();
const Tienda = require('../models/tiendas');
const User = require("../models/user");
const privateRoute = require("../middleware/privateRoute");
// const tiendas = require('../models/tiendas');

router.post("/",privateRoute, (req,res) => {
  const nuevaTienda = new Tienda({
    nombre : req.body.nombre,
    comidas : req.body.comidas,
    nombreProductos: req.body.nombreProductos,
    descripcion : req.body.descripcion,
    barrio : req.body.barrio,
    categorias : req.body.categorias,
    foto: req.body.foto
  });
  Promise.all([
    User.findById(req.body.userId),
    nuevaTienda.save(),
  ]).then(values => {
    values[0].tiendas = values[0].tiendas.concat(values[1]._id);
    values[0].save();
    return values[0]
  }).then((user) => res.status(200).send(`${user.nombre} se ha guardado la tienda`).end())
  .catch(err => {
    return  res.status(400).send(err).end()
  })
})

router.get("/:id",(req,res) => {
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
  .then(user => res.status(200).send(user.tiendas))
  .catch(err => res.status(404).send("Id Invalido"))
})

router.delete("/:id",(req,res) => {
  const {id} = req.params;
  Tienda.findByIdAndRemove(id)
  .then(tiendaRemovida => {
    return res.status(200).json(tiendaRemovida).end()
  })
  .catch(() => res.status(404).send("No existe tienda").end())
})

module.exports = router