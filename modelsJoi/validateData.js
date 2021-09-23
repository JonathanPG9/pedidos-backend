const joi = require("joi")



const validationRegister = (data) => {
  const schema = joi.object({
    nombre: joi.string().min(4).max(25).required().regex((/^[A-Za-z]+$/)).messages({
      "any.required": "{{#label}} Campo requerido",
      "string.empty": "{{#label}} Campo requerido",
      "string.min": "{{#label}} Invalido",
      "string.max": "Ingrese un {{#label}} mas corto",
      "object.regex": "Solo se permite letras en el nombre {{#label}} ",
      "string.pattern.base": "Solo se permite letras en el {{#label}}"
    }),
    apellido: joi.string().min(3).max(50).required().regex((/^[A-Za-z]+$/)).messages({
      "any.required": "{{#label}} Campo requerido",
      "string.empty": "{{#label}} Campo requerido",
      "string.min": "{{#label}} Invalido",
      "string.max": "Ingrese un {{#label}} mas corto",
      "object.regex": "Solo se permite letras en el nombre {{#label}} ",
      "string.pattern.base": "Solo se permite letras en el {{#label}}"
    }),
    email: joi.string().min(5).max(50).required().email().messages({
      "any.required": "{{#label}} Campo requerido",
      "string.empty": "{{#label}} Campo requerido",
      "string.min": "{{#label}} Invalido",
      "string.max": "Ingrese un {{#label}} mas corto",
      "string.email" : "{{#label}} Formato invalido",
    }),
    password: joi.string().min(5).max(50).required().messages({
      "any.required": "{{#label}} Campo requerido",
      "string.empty": "{{#label}} Campo requerido",
      "string.min": "{{#label}} Ingrese una contrase;a mas segura",
      "string.max": "{{#label}} Ingrese una contrase;a mas corta",
    }),
    sexo: joi.string().min(2).max(50).messages({
      "string.min": "{{#label}} Campo Invalido",
      "string.max": "{{#label}} Campo Invalido",
    }),
    dni : joi.string().required().min(8).max(8).regex(/^[0-9]+$/).messages({
      "any.required": "{{#label}} Campo requerido",
      "string.empty": "{{#label}} Campo requerido",
      "string.min": "{{#label}} Dni Invalido",
      "string.max": "{{#label}} Dni Invalido",
      "object.regex": "Solo se permite Numeros en el nombre {{#label}} ",
      "string.pattern.base": "Solo se permite Numeros en el {{#label}}"
    }),
    edad: joi.number().min(15).max(100).required().messages({
      "any.required": "{{#label}} Campo requerido",
      "number.empty": "{{#label}} Campo requerido",
      "number.min": "{{#label}} Tiene que ser mayor de 16 a;os",
      "number.max": "{{#label}} Tiene que ser menor que 100 a;os",
    }),
    telefono: joi.string().min(10).max(10).regex(/^[0-9]+$/).messages({
      "string.empty": "{{#label}} Campo requerido",
      "string.min": "{{#label}} Numero invalido",
      "string.max": "{{#label}} Numero invalido",
      "object.regex": "Solo se permite Numeros en el nombre {{#label}} ",
      "string.pattern.base": "Solo se permite Numeros en el {{#label}}"
    }),
  })
  return schema.validate(data)
}

const validationLogin = (data) => {
  const schema = joi.object({
    email: joi.string().min(5).max(50).required().email().messages({
      "any.required": "{{#label}} Campo requerido",
      "string.empty": "{{#label}} Campo requerido",
      "string.min": "{{#label}} Invalido",
      "string.email": "{{#label}} Invalido",
      "string.max": "Invalido",
    }),
    password: joi.string().min(5).max(50).required().messages({
      "any.required": "{{#label}} Campo requerido",
      "string.empty": "{{#label}} Campo requerido",
      "string.min": "{{#label}} Invalida",
      "string.max": "{{#label}} Invalida",
    })
  })
  return schema.validate(data)
}

module.exports.validationLogin = validationLogin;
module.exports.validationRegister = validationRegister;