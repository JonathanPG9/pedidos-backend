const mongoose = require('mongoose')
require("dotenv").config();

mongoose.connect(process.env.MONGO,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conectado a la base de dato MongoDB")
}).catch((err) => console.log("Ha ocurrido un error " + err))
