const {Router} = require('express'); 
const router = Router();
const Tienda = require('../models/tiendas');
const User = require("../models/user");
const privateRoute = require("../middleware/privateRoute");

router.post("/",privateRoute, (req,res,next) => {
  const nuevaTienda = new Tienda({
    nombre : req.body.nombre,
    origen : req.body.origen,
  });
  Promise.all([
    User.findById(req.body.userId),
    nuevaTienda.save(),
  ])
  .then(values => {
    values[0].tiendas = values[0].tiendas.concat(values[1]);
    values[0].save();
  })
  .then( () => res.status(200).send('Bien').end())
  .catch(err => next(err))
})

module.exports = router