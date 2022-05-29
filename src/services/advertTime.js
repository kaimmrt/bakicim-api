const { AdvertTime } = require('../helper/db')

const findAll = async () => {
    return await AdvertTime.findAll()
}

module.exports = {
    findAll
}