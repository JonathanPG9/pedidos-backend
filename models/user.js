const mongo = require("mongoose");
const fecha = new Date();
const dia = fecha.getDate();
const mes = fecha.getMonth() + 1; // meses tienen 0 de base 
const year = fecha.getFullYear();

const User = mongo.Schema({

  nombre: {
    type: String,
    require: true,
  },
  apellido: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  tiendas: [
    {
      type: mongo.Schema.Types.ObjectId,
      ref : "Tienda"
    }
  ],
  telefono: {
    type: Number,
    require: true
  },
  fecha: {
    type: String,
    default: `${dia}/${mes}/${year}`
  },
  sexo: {
    type: String
  },
  edad: {
  type: Number
  }

})


module.exports = mongo.model("User", User)