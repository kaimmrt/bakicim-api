const { AdvertType } = require('../helper/db')

const findAll = () => {
    return AdvertType.findAll()
}

module.exports = {
    findAll
}