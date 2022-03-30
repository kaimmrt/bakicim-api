const { User, UserType } = require('../helper/db')

const findMe = (user_id) => {
    let me = User.findOne(
        {
            where: { user_id },
            include: UserType
        }
    )

    return me;
}


module.exports = {
    findMe,
}