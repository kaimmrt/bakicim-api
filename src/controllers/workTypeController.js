const httpStatus = require('http-status')
const {
    findAll
} = require('../services/workType')

exports.getAll = async (req, res) => {
    findAll()
        .then((response) => {
            res.status(httpStatus.OK).json({ result: true, data: response })
        })
        .catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        })
}
