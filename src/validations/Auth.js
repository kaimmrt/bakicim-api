const Joi = require('joi')

const createValidation = Joi.object({
    username: Joi.string().required().min(2),
    password: Joi.string().required().min(6),
    email: Joi.string().email().required().min(6),
    user_type_id: Joi.number().integer().required().min(1).max(2),
})

const loginValidation = Joi.object({
    password: Joi.string().required().min(6),
    email: Joi.string().email().required().min(6),
})

module.exports = {
    createValidation,
    loginValidation
}