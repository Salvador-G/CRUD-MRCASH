const Joi = require('joi');

const userSchema = Joi.object({
  nombre: Joi.string().min(3).max(30).required(),
  correo: Joi.string().email().required(),
  edad: Joi.number().integer().min(18).optional()
});

module.exports = userSchema;