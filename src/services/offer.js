const { Offer, User, UserType } = require('../helper/db')

const insert = (data) => {
    return Offer.create(data)
}

const findByOfferId = (offer_id) => {
    return Offer.findByPk(offer_id, {
        include: [{ model: User, include: [{ model: UserType }] }]
    })
}

module.exports = {
    insert,
    findByOfferId
}