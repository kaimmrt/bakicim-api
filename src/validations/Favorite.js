const Joi = require('joi')

const createValidation = Joi.object({
    advert_id: Joi.number().required(),
})

module.exports = {
    createValidation,
}