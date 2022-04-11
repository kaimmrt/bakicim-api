const { Advert, AdvertType, User, UserType } = require('../helper/db')

const insert = (data) => {
    console.log(data)
    return Advert.create(data)
}

const findAll = () => {
    return Advert.findAll({
        include: [{ model: AdvertType }, { model: User, include: [{ model: UserType }] }]
    })
}

const findByUserId = (user_id) => {
    return Advert.findAll({
        where: { user_id },
        include: [{ model: AdvertType }, { model: User, include: [{ model: UserType }] }]
    })
}

const findByAdvertId = (advert_id) => {
    return Advert.findByPk(advert_id, {
        include: [{ model: AdvertType }, { model: User, include: [{ model: UserType }] }]
    })
}

const updateAdvert = ({ advert_id, data }) => {
    return Advert.update(data, { where: { advert_id } })
}

const deleteAdvert = ({ advert_id }) => {
    return Advert.destroy({ where: { advert_id } })
}

module.exports = {
    insert,
    findAll,
    findByUserId,
    findByAdvertId,
    updateAdvert,
    deleteAdvert
}