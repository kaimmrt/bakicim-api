const { User } = require('../helper/db')

const findOneByEmail = (email) => {
    return User.findOne({ where: { email } })
}

const insert = (data) => {
    return user = User.create(data)
}

module.exports = {
    insert,
    findOneByEmail
}