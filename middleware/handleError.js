const manejoDeErrores = {
  JsonWebTokenError : (res,error) => res.status(498).send(`${error}`).end(),
  ValidationError : (res,error) => res.status(401).send(`${error}`).end(),
  CastError : (res,error) => res.status(400).send(`El usuario no está registrado`).end(),
  SyntaxError: (res,error) => res.status(498).send(`${error}`).end(),
  TypeError : res => res.status(404).send("Email y/o password invalidos").end(),
  default : res => res.status(500).send("Error interno").end()
}
module.exports = ((error,req,res,next) => {
  console.log(error.name);
  const manejador = manejoDeErrores[error.name] || manejoDeErrores["default"]
  manejador(res,error)
})