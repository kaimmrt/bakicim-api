const { Favorite, Advert, AdvertType,AdvertTime, User, UserType, Gender } = require('../helper/db')

const insert = async (data) => {
    return await Favorite.create(data)
}

const findFavoritesByUser = async (user_id) => {
    return await Favorite.findAll({
        where: { user_id },
        include: [{ model: Advert, include: [{ model: AdvertType }, { model: AdvertTime }, { model: User }] }, { model: User, include: [{ model: UserType }, { model: Gender }] }]
    })
}

const findFavoriteByAdvertId = async (advert_id) => {
    return await Favorite.findOne({
        where: { advert_id },
        include: [{ model: Advert, include: [{ model: AdvertType }, { model: AdvertTime }, { model: User }] }, { model: User, include: [{ model: UserType }, { model: Gender }] }]
    })
}

const findFavoriteByUserIdAndAdvertId = async (user_id, advert_id) => {
    return await Favorite.findOne({
        where: { user_id, advert_id },
        include: [{ model: Advert, include: [{ model: AdvertType }, { model: AdvertTime }, { model: User }] }, { model: User, include: [{ model: UserType }, { model: Gender }] }]
    })
}

const deleteFavorite = async ({ user_id, advert_id }) => {
    return await Favorite.destroy({ where: { user_id, advert_id } })
}

module.exports = {
    insert,
    deleteFavorite,
    findFavoritesByUser,
    findFavoriteByUserIdAndAdvertId,
    findFavoriteByAdvertId,
}