const { Favorite, Advert, AdvertType, User, UserType } = require('../helper/db')

const insert = async (data) => {
    return await Favorite.create(data)
}

const findFavoritesByUser = async (user_id) => {
    return await Favorite.findAll({
        where: { user_id },
        include: [{ model: Advert, include: [{ model: AdvertType }] }, { model: User, include: [{ model: UserType }] }]
    })
}

const findFavoriteByUserIdAndAdvertId = async ({ user_id, advert_id }) => {
    return await Favorite.findOne({
        where: { user_id, advert_id },
        include: [{ model: Advert, include: [{ model: AdvertType }] }, { model: User, include: [{ model: UserType }] }]
    })
}

const deleteFavorite = async ({ user_id, advert_id }) => {
    return await Favorite.destroy({ where: { user_id, advert_id } })
}

module.exports = {
    insert,
    deleteFavorite,
    findFavoritesByUser,
    findFavoriteByUserIdAndAdvertId
}