const {Router} = require('express'); 
const router = Router();
const Tienda = require('../models/tiendas');
const User = require("../models/user");
const privateRoute = require("../middleware/privateRoute");

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
  ])
  .then(values => {
    values[0].tiendas = values[0].tiendas.concat(values[1]._id);
    values[0].save();
  })
  .then(() => res.status(500).send("Guardado").end())
  .catch(err => {
    return  res.status(400).send(err).end()
  })
})

module.exports = router