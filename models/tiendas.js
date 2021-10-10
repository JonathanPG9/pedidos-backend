const mongo = require("mongoose");

const Tienda = mongo.Schema({
  nombre: {
    type: String,
    require: true,
  },
  foto: {
    type:String,
    require: true
  },
  categorias: {
    type: String,
    require: true
  },
  nombreProductos: {
    type: String,
    require: true
  },
  descripcion: {
    type: String,
    require: true
  },
  barrio: {
    type: String,
    require: true
  },
  comidas: {
    type: Array
  },
  rating: {
    type:Number
  },
  user: {
      type: mongo.Schema.Types.ObjectId,
      ref : "User"
    }
})


module.exports = mongo.model("Tienda", Tienda)