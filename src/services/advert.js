const { Advert, AdvertType, User, UserType, AdvertTime, Gender } = require('../helper/db')

const insert = async (data) => {
    return await Advert.create(data)
}

const findAll = async () => {
    return await Advert.findAll({
        include: [{ model: AdvertType }, { model: AdvertTime }, { model: User, include: [{ model: UserType }, { model: Gender }] }]
    })
}

const findByUserId = async (user_id) => {
    return await Advert.findAll({
        where: { user_id },
        include: [{ model: AdvertType }, { model: AdvertTime }, { model: User, include: [{ model: UserType }, { model: Gender }] }]
    })
}

const findByAdvertId = async (advert_id) => {
    return await Advert.findByPk(advert_id, {
        include: [{ model: AdvertType }, { model: AdvertTime }, { model: User, include: [{ model: UserType }, { model: Gender }] }]
    })
}

const updateAdvert = async ({ advert_id, data }) => {
    return await Advert.update(data, { where: { advert_id } })
}

const updateShowAdvert = async ({ advert_id, status }) => {
    await Advert.update({
        status: status == 1 ? 2 : 1
    }, { where: { advert_id } })

    return await Advert.findAll({
        include: [{ model: AdvertType }, { model: AdvertTime }, { model: User, include: [{ model: UserType }, { model: Gender }] }]
    })
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
    updateShowAdvert,
    deleteAdvert
}