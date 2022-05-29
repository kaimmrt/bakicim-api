const { AdvertType } = require('../helper/db')

const findAll = async () => {
    return await AdvertType.findAll()
}

module.exports = {
    findAll
}