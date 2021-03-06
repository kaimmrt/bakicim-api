const { User, UserType, Gender } = require('../helper/db')

const findMe = async (user_id) => {
    let me = await User.findOne(
        {
            where: { user_id },
            include: [{ model: UserType }, { model: Gender }]
        }
    )
    return me;
}

const profileUpdate = async ({ user_id, data }) => {
    await User.update(data, { where: { user_id } })

    return await User.findOne(
        {
            where: { user_id },
            include: [{ model: UserType }, { model: Gender }]
        }
    )
}

module.exports = {
    findMe,
    profileUpdate
}