const Joi = require('joi')

const createValidation = Joi.object({
    work_type_id: Joi.number().required(),
    price: Joi.number().required(),
    note: Joi.string().required(),
})

module.exports = {
    createValidation,
}