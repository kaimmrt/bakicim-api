const { Offer, User, UserType, Advert, Gender, AdvertTime, AdvertType } = require('../helper/db')

const insert = async (data) => {
    return await Offer.create(data)
}

const findByOfferId =async (offer_id) => {
    return await Offer.findByPk(offer_id, {
        include: [{ model: User, include: [{ model: UserType }] }]
    })
}

const findByUserId = async (user_id) => {
    return await Offer.findAll({
        where: { user_id },
        include: [{ model: Advert, include: [{ model: User, include: [{ model: Gender }, { model: UserType }] }, { model: AdvertTime }, { model: AdvertType }] }]
    })
}

const findByAdvertIdAndUserId = async (data) => {
    return await Offer.findOne({
        where: { user_id: data.user_id, advert_id: data.advert_id }
    })
}

const updateOfferPrice = async ({ offer_id, data }) => {
    return await Offer.update({
        price: data
    }, { where: { offer_id } })
}


const removeOffer =async ( offer_id ) => {
    return await Offer.destroy({ where: { offer_id } })
}

const acceptOfferService=async(offer_id)=>{
    return await Offer.update({
        status:2
    },{where:{offer_id}})
}

const declineOfferService=async(offer_id)=>{
    return await Offer.update({
        status:3
    },{where:{offer_id}})
}

module.exports = {
    insert,
    updateOfferPrice,
    findByOfferId,
    findByUserId,
    findByAdvertIdAndUserId,
    removeOffer,
    acceptOfferService,
    declineOfferService
}