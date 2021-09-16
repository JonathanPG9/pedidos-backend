const mongo = require("mongoose");

const Tienda = mongo.Schema({
  nombre: {
    type: String,
    require: true,
  },
  origen: {
    type: String,
    require: true
  },
  descripcion: {
    type: String
  },
  user: {
      type: mongo.Schema.Types.ObjectId,
      ref : "User"
    }
})


module.exports = mongo.model("Tienda", Tienda)