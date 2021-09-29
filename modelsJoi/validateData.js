const joi = require("joi")



const validationRegister = (data) => {
  const schema = joi.object({
    nombre: joi.string().min(3).max(15).required().regex((/^[A-Za-z]+$/)).messages({
      "any.required": "Campo nombre obligatorio",
      "string.empty": "Campo nombre obligatorio",
      "string.min": "El nombre Debe contener un minimo de 3 caracteres",
      "string.max": "El nombre Debe contener un maximo de 15 caracteres",
      "object.regex": "Solo se admiten caracteres alfabéticos",
      "string.pattern.base": "Solo se admiten caracteres alfabéticos"
    }),
    apellido: joi.string().min(3).max(25).required().regex((/^[A-Za-z]+$/)).messages({
      "any.required": "Campo Apellido obligatorio",
      "string.empty": "Campo Apellido obligatorio",
      "string.min": "El apellido Debe contener un minimo de 3 caracteres",
      "string.max": "El apellido Debe contener un maximo de 25 caracteres",
      "object.regex": "Solo se admiten caracteres alfabéticos",
      "string.pattern.base": "Solo se admiten caracteres alfabéticos"
    }),
    email: joi.string().min(8).max(35).required().email().messages({
      "any.required": "Campo Email obligatorio",
      "string.empty": "Campo Email obligatorio",
      "string.min": "El Email Debe contener un minimo de 8 caracteres",
      "string.max": "El Email Debe contener un maximo de 35 caracteres",
      "string.email" : "Email Formato invalido",
    }),
    password: joi.string().min(5).max(30).required().messages({
      "any.required": "Campo Password obligatorio",
      "string.empty": "Campo Password obligatorio",
      "string.min": "La Password  Debe contener un minimo de 5 caracteres",
      "string.max": "La Password  Debe contener un maximo de 30 caracteres",
    }),
    sexo: joi.string().min(2).max(15).messages({
      "string.min": "Sexo Debe contener un minimo de 5 caracteres",
      "string.max": "Sexo Debe contener un maximo de 15 caracteres",
    }),
    dni: joi.string().required().min(8).max(8).regex(/^[0-9]+$/).messages({
      "any.required": "Campo DNI obligatorio",
      "string.empty": "Campo DNI obligatorio",
      "string.min": "El DNI Debe contener un minimo de 8 caracteres",
      "string.max": "El DNI Debe contener un maximo de 8 caracteres",
      "object.regex": "Solo se admiten caracteres numericos",
      "string.pattern.base": "Solo se admiten caracteres numericos"
    }),
    edad: joi.number().min(14).max(100).required().messages({
      "any.required": "Campo Edad obligatorio",
      "number.empty": "Campo Edad obligatorio",
      "number.min": "Edad minima 14 a;os",
      "number.max": "Edad maxima 100 a;os",
    }),
    telefono: joi.string().min(10).max(10).regex(/^[0-9]+$/).messages({
      "string.empty": "Campo Telefono obligatorio",
      "string.min": "El Telefono Debe contener un maximo de 10 caracteres",
      "string.max": "El Telefono Debe contener un maximo de 10 caracteres",
      "object.regex": "Solo se admiten caracteres numericos en el Telefono ",
      "string.pattern.base": "Solo se admiten caracteres numericos en el Telefono "
    }),
  })
  return schema.validate(data)
}

const validationLogin = (data) => {
  const schema = joi.object({
    email: joi.string().min(8).max(35).required().email().messages({
      "any.required": "Campo Email obligatorio",
      "string.empty": "Campo Email obligatorio",
      "string.min": "El Email Debe contener un minimo de 8 caracteres",
      "string.max": "El Email Debe contener un maximo de 35 caracteres",
      "string.email" : "Email Formato invalido",
    }),
    password: joi.string().min(5).max(50).required().messages({
      "any.required": "Campo Password obligatorio",
      "string.empty": "Campo Password obligatorio",
      "string.min": "El Password  Debe contener un minimo de 5 caracteres",
      "string.max": "El Password  Debe contener un maximo de 30 caracteres",
    })
  })
  return schema.validate(data)
}

module.exports.validationLogin = validationLogin;
module.exports.validationRegister = validationRegister;