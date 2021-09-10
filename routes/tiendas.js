const {Router} = require('express'); 
const router = Router();
const Tienda = require('../models/tiendas');
const User = require("../models/user")
const privateRoute = require("../middleware/privateRoute");


router.post("/", async (req,res,next) => {
  const user = await User.findById(req.body.userId)
  const nuevaTienda = new Tienda( {
    nombre : req.body.nombre,
    origen : req.body.origen,
  })
  try{
      const tienda = await nuevaTienda.save()
      user.tiendas = user.tiendas.concat(tienda)
      await user.save()
      res.send(tienda)
    }
  catch(err){
  next(err)
  }
})


module.exports = router