const { WorkTypePrice, WorkType, User, UserType } = require('../helper/db')

const insert = (data) => {
    console.log(data)
    return WorkTypePrice.create(data)
}

const findAll = () => {
    return WorkTypePrice.findAll({
        include: [{ model: WorkType }, { model: User, include: [{ model: UserType }] }]
    })
}

const findByUserId = (user_id) => {
    return WorkTypePrice.findAll({
        where: { user_id },
        include: [{ model: WorkType }, { model: User, include: [{ model: UserType }] }]
    })
}

const findByWorkTypePriceId = (work_type_price_id) => {
    return WorkTypePrice.findByPk(work_type_price_id, {
        include: [{ model: WorkType }, { model: User, include: [{ model: UserType }] }]
    })
}

const updateWorkTypePrice = ({ work_type_price_id, data }) => {
    return WorkTypePrice.update(data, { where: { work_type_price_id } })
}

const deleteWorkTypePrice = ({ work_type_price_id }) => {
    return WorkTypePrice.destroy({ where: { work_type_price_id } })
}

module.exports = {
    insert,
    findAll,
    findByUserId,
    findByWorkTypePriceId,
    updateWorkTypePrice,
    deleteWorkTypePrice
}