const { User, Gender } = require('../helper/db')

const findOneByEmail = async (email) => {
    return await User.findOne(
        {
            where: { email },
            include: [{ model: Gender }]
        })
}

const insert = (data) => {
    return user = User.create(data)
}

module.exports = {
    insert,
    findOneByEmail
}