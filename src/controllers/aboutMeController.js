const httpStatus = require('http-status')
const { findMe } = require('../services/aboutMe')

exports.getMe = async (req, res) => {
    const { user_id } = req.decoded;

    findMe(user_id)
        .then((response) => {
            res.status(httpStatus.OK).json({ user: response, result: true })
        })
        .catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        })
}
