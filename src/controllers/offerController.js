const httpStatus = require('http-status')
const { insert, findByOfferId } = require('../services/offer')

exports.create = async (req, res) => {
    const { user_type_id, user_id } = req.decoded
    if (user_type_id != 2)
        res.status(httpStatus.BAD_REQUEST).send({ message: "Sadece ziyaretçiler teklif oluşturabilir!" })
    req.body.user_id = user_id
    insert(req.body)
        .then((response) => {
            res.status(httpStatus.CREATED).send(response)
        })
        .catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        })
}

exports.getByOfferId = async (req, res) => {
    if (!req.params.offer_id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "id bilgisi bulunamadı"
        })
    }
    findByOfferId(req.params.offer_id)
        .then((response) => {
            if (response)
                res.status(httpStatus.OK).send(response)
            else
                res.status(httpStatus.NOT_FOUND).send({ message: "bu id bilgisine ait sonuç bulunumadı!" })
        })
        .catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        })
}