const joi = require("joi")



const validationRegister = (data) => {
  const schema = joi.object({
    nombre: joi.string().min(4).max(25).required().messages({
      "any.required": "{{#label}} Campo requerido",
      "string.empty": "{{#label}} Sin completar!",
      "string.min": "{{#label}} Invalido",
      "string.max": "Ingrese un {{#label}} mas corto",
    }),
    apellido: joi.string().min(5).max(50).required().messages({
      "any.required": "{{#label}} Campo requerido",
      "string.empty": "{{#label}} Sin completar!",
      "string.min": "{{#label}} Invalido",
      "string.max": "Ingrese un {{#label}} mas corto",
    }),
    email: joi.string().min(5).max(50).required().email().messages({
      "any.required": "{{#label}} Campo requerido",
      "string.empty": "{{#label}} Sin completar!",
      "string.min": "{{#label}} Invalido",
      "string.max": "Ingrese un {{#label}} mas corto",
      "string.email" : "{{#label}} Formato invalido",
    }),
    password: joi.string().min(5).max(50).required().messages({
      "any.required": "{{#label}} Campo requerido",
      "string.empty": "{{#label}} Sin completar!",
      "string.min": "{{#label}} Ingrese una contrase;a mas segura",
      "string.max": "{{#label}} Ingrese una contrase;a mas corta",
    }),
    sexo: joi.string().min(2).max(50).messages({
      "string.min": "{{#label}} Campo Invalido",
      "string.max": "{{#label}} Campo Invalido",
    }),
    dni : joi.string().required().min(8).max(8).messages({
      "any.required": "{{#label}} Campo requerido",
      "string.empty": "{{#label}} Sin completar!",
      "string.min": "{{#label}} Dni Invalido",
    }),
    edad: joi.number().min(15).max(100).required().messages({
      "any.required": "{{#label}} Campo requerido",
      "number.empty": "{{#label}} Sin completar!",
      "number.min": "{{#label}} Tiene que ser mayor de 15 a;os",
      "number.max": "{{#label}} Tiene que ser menor que 100 a;os",
    }),
    numero: joi.string().min(10).max(10).messages({
      "string.empty": "{{#label}} Sin completar!",
      "string.min": "{{#label}} Numero invalido",
      "string.max": "{{#label}} Numero invalido",
    }),
  })
  return schema.validate(data)
}

const validationLogin = (data) => {
  const schema = joi.object({
    nombre: joi.string().min(4).max(50).required().messages({
      "any.required": "{{#label}} Campo requerido",
      "string.empty": "{{#label}} Sin completar!",
      "string.min": "{{#label}} Invalida",
      "string.max": "{{#label}} Invalida",
    }),
    password: joi.string().min(5).max(50).required().messages({
      "any.required": "{{#label}} Campo requerido",
      "string.empty": "{{#label}} Sin completar!",
      "string.min": "{{#label}} Invalida",
      "string.max": "{{#label}} Invalida",
    })
  })
  return schema.validate(data)
}

module.exports.validationLogin = validationLogin;
module.exports.validationRegister = validationRegister;