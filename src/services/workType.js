const { WorkType } = require('../helper/db')

const findAll = () => {
    return WorkType.findAll()
}

module.exports = {
    findAll
}