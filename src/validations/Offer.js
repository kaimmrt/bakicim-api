const Joi = require('joi')

const createValidation = Joi.object({
    advert_id: Joi.number().required(),
    price: Joi.number().required()
})

const updateValidation = Joi.object({
    price: Joi.number().required(),
    offer_id:Joi.number()
})

const statusUpdateValidation = Joi.object({
    offer_id:Joi.number()
})

module.exports = {
    createValidation,
    updateValidation,
    statusUpdateValidation
}