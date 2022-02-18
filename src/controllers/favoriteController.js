const httpStatus = require('http-status')
const { insert, findByFavoriteId, deleteFavorite, findFavoritesByUser } = require('../services/favorite')

exports.findAllByUser = async (req, res) => {
    const { user_type_id, user_id } = req.decoded;

    if (user_type_id != 2)
        res.status(httpStatus.BAD_REQUEST).send({ message: "Sadece ziyaretçiler favorileri görebilir!" })
    findFavoritesByUser(user_id)
        .then((response) => {
            res.status(httpStatus.OK).send(response)
        })
        .catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        })
}

exports.create = async (req, res) => {
    const { user_type_id, user_id } = req.decoded;

    if (user_type_id != 2)
        res.status(httpStatus.BAD_REQUEST).send({ message: "Sadece ziyaretçiler favori ekleyebilir!" })
    req.body.user_id = user_id
    insert(req.body)
        .then((response) => {
            res.status(httpStatus.CREATED).send(response)
        })
        .catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        })
}

exports.delete = async (req, res) => {
    const { user_type_id } = req.decoded;

    if (!req.params.favorite_id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "id bilgisi bulunamadı"
        })
    }
    if (user_type_id != 2)
        res.status(httpStatus.BAD_REQUEST).send({ message: "Sadece ziyaretçiler favori silebilir!" })
    findByFavoriteId(req.params.favorite_id)
        .then((response) => {
            if (response) {
                deleteFavorite({ favorite_id: req.params.favorite_id })
                    .then((response) => {
                        res.status(httpStatus.OK).send(response)
                    })
                    .catch((err) => {
                        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
                    })
            }
            else
                res.status(httpStatus.NOT_FOUND).send({ message: "bu id bilgisine ait sonuç bulunumadı!" })
        })
        .catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        })
}