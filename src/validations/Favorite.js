const Joi = require('joi')

const createValidation = Joi.object({
    work_type_price_id: Joi.number().required(),
})

module.exports = {
    createValidation,
}