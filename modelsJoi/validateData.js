const joi = require("joi")



const validationRegister = (data) => {
  const schema = joi.object({
    nombre: joi.string().min(4).max(25).required().regex((/^[A-Za-z]+$/)).messages({
      "any.required": "NombreCampo requerido",
      "string.empty": "NombreCampo requerido",
      "string.min": "NombreInvalido",
      "string.max": "Ingrese un Nombremas corto",
      "object.regex": "Solo se permite letras en el nombre Nombre",
      "string.pattern.base": "Solo se permite letras en el Nombre"
    }),
    apellido: joi.string().min(3).max(50).required().regex((/^[A-Za-z]+$/)).messages({
      "any.required": "Apellido Campo requerido",
      "string.empty": "Apellido Campo requerido",
      "string.min": "Apellido Invalido",
      "string.max": "Ingrese un Apellido mas corto",
      "object.regex": "Solo se permite letras en el nombre Apellido ",
      "string.pattern.base": "Solo se permite letras en el Apellido"
    }),
    email: joi.string().min(5).max(50).required().email().messages({
      "any.required": "Email Campo requerido",
      "string.empty": "Email Campo requerido",
      "string.min": "Email Invalido",
      "string.max": "Ingrese un Email mas corto",
      "string.email" : "Email Formato invalido",
    }),
    password: joi.string().min(5).max(50).required().messages({
      "any.required": "Password Campo requerido",
      "string.empty": "Password Campo requerido",
      "string.min": "Password Ingrese una contrase;a mas segura",
      "string.max": "Password Ingrese una contrase;a mas corta",
    }),
    sexo: joi.string().min(2).max(50).messages({
      "string.min": "Sexo Campo Invalido",
      "string.max": "Sexo Campo Invalido",
    }),
    dni : joi.string().required().min(8).max(8).regex(/^[0-9]+$/).messages({
      "any.required": "DNI Campo requerido",
      "string.empty": "DNI Campo requerido",
      "string.min": "DNI Dni Invalido",
      "string.max": "DNI Dni Invalido",
      "object.regex": "Solo se permite Numeros en el nombre DNI ",
      "string.pattern.base": "Solo se permite Numeros en el DNI"
    }),
    edad: joi.number().min(15).max(100).required().messages({
      "any.required": "Edad Campo requerido",
      "number.empty": "Edad Campo requerido",
      "number.min": "Edad Tiene que ser mayor de 16 a;os",
      "number.max": "Edad Tiene que ser menor que 100 a;os",
    }),
    telefono: joi.string().min(10).max(10).regex(/^[0-9]+$/).messages({
      "string.empty": "Telefono Campo requerido",
      "string.min": "Telefono Numero invalido",
      "string.max": "Telefono Numero invalido",
      "object.regex": "Solo se permite Numeros en el nombre Telefono ",
      "string.pattern.base": "Solo se permite Numeros en el Telefono "
    }),
  })
  return schema.validate(data)
}

const validationLogin = (data) => {
  const schema = joi.object({
    email: joi.string().min(5).max(50).required().email().messages({
      "any.required": "Email Campo requerido",
      "string.empty": "Email Campo requerido",
      "string.min": "Email Invalido",
      "string.email": "Email Invalido",
      "string.max": "Invalido",
    }),
    password: joi.string().min(5).max(50).required().messages({
      "any.required": "Password Campo requerido",
      "string.empty": "Password Campo requerido",
      "string.min": "Password Invalida",
      "string.max": "Password Invalida",
    })
  })
  return schema.validate(data)
}

module.exports.validationLogin = validationLogin;
module.exports.validationRegister = validationRegister;