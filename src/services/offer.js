const { Offer, User, UserType, Advert, Gender, AdvertTime, AdvertType } = require('../helper/db')

const insert = async (data) => {
    return await Offer.create(data)
}

const findByOfferId = (offer_id) => {
    return Offer.findByPk(offer_id, {
        include: [{ model: User, include: [{ model: UserType }] }]
    })
}

const findByUserId =async (user_id) => {
    return await Offer.findOne({
        where: { user_id },
        include: [ { model: Advert, include: [{ model: User, include: [{ model: Gender }, { model: UserType }] }, { model: AdvertTime }, { model: AdvertType }] }]
    })
}

const findByAdvertIdAndUserId = async (data) => {
    return await Offer.findOne({
        where: { user_id: data.user_id, advert_id: data.advert_id }
    })
}

module.exports = {
    insert,
    findByOfferId,
    findByUserId,
    findByAdvertIdAndUserId
}