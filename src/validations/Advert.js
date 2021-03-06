const Joi = require('joi')

const createValidation = Joi.object({
    advert_time_id: Joi.number().required(),
    advert_type_id: Joi.number().required(),
    price: Joi.number().required(),
    note: Joi.string().required(),
})

module.exports = {
    createValidation,
}