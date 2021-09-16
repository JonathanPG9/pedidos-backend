const express = require("express");
const app = express();
const cors = require("cors");
require("../mongo.js")
const handleError = require("../middleware/handleError")
const notFound = require("../middleware/notFound")

app.use(cors({
  origin: ['https://feltymvp.web.app',"https://jonathanpaniagua.com", "http://localhost:3000","http://localhost:19002/", "http://192.168.100.222",
  "exp://127.0.0.1:19000"
],
  credentials: true
}));
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
  console.log(`Servidor conectado en ${PORT}`);
})

app.set("json spaces", 2)
app.use(express.json())
app.use(express.urlencoded({extended: false}))

const auth = require("../routes/auth")
const tiendas = require("../routes/tiendas")

app.use("/api/",auth)
app.use("/api/tiendas",tiendas)
app.use("*",notFound)
app.use(handleError)