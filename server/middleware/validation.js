const Joi = require('joi');

exports.registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName:  Joi.string().min(2).max(50).required(),
  email:     Joi.string().email().required(),
  password:  Joi.string().min(6).max(100).required(),
  location:    Joi.string().allow('').optional(),
  description: Joi.string().allow('').optional(),
  occupation:  Joi.string().allow('').optional()
});

exports.loginSchema = Joi.object({
  email:    Joi.string().email().required(),
  password: Joi.string().required()
});

exports.validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map(d => d.message)
    });
  }
  next();
};