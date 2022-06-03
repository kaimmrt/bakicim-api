const httpStatus = require('http-status')
const { insert, deleteFavorite, findFavoritesByUser, findFavoriteByUserIdAndAdvertId } = require('../services/favorite')

exports.findAllByUser = async (req, res) => {
    const { user_type_id, user_id } = req.decoded;
    console.log("girdi")
    if (user_type_id != 2)
        res.status(httpStatus.BAD_REQUEST).send({ message: "Sadece ziyaretçiler favorileri görebilir!" })
    findFavoritesByUser(user_id)
        .then((response) => {
            res.status(httpStatus.OK).send({ result: true, data: response })
        })
        .catch((err) => {
            console.log(err)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ result: false, message: err })
        })
}

exports.createOrDelete = async (req, res) => {
    const { user_type_id, user_id } = req.decoded;
    if (user_type_id != 2)
        res.status(httpStatus.BAD_REQUEST).send({ message: "Sadece ziyaretçiler favori ekleyebilir!", result: false })
    req.body.user_id = user_id
    findFavoriteByUserIdAndAdvertId(req.body).then((response) => {
        if (response) {
            deleteFavorite(req.body)
                .then((resp) => {
                    res.status(httpStatus.OK).send({ result: true, type: 'delete', data: resp })
                })
                .catch((err) => {
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ result: false, message: err })
                    return
                })
        }
        else {
            insert(req.body)
                .then((resp) => {
                    res.status(httpStatus.CREATED).send({ result: true, type: 'create', data: resp })
                })
                .catch((err) => {
                    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ result: false, message: err })
                    return
                })
        }
    }).catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ reuslt: false, message: err })
    })
}