const { Favorite, Advert, AdvertType, User, UserType } = require('../helper/db')

const insert = (data) => {
    return Favorite.create(data)
}

const findByFavoriteId = (favorite_id) => {
    return Favorite.findByPk(favorite_id, {
        include: [{ model: Advert, include: [{ model: AdvertType }] }, { model: User, include: [{ model: UserType }] }]
    })
}

const findFavoritesByUser = (user_id) => {
    return Favorite.findAll({
        where: { user_id },
        include: [{ model: Advert, include: [{ model: AdvertType }] }, { model: User, include: [{ model: UserType }] }]
    })
}

const deleteFavorite = ({ favorite_id }) => {
    return Favorite.destroy({ where: { favorite_id } })
}

module.exports = {
    insert,
    findByFavoriteId,
    deleteFavorite,
    findFavoritesByUser
}