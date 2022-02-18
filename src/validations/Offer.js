const Joi = require('joi')

const createValidation = Joi.object({
    to_user_id: Joi.number().required(),
    price: Joi.number().required()
})

module.exports = {
    createValidation,
}