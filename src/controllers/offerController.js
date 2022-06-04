const httpStatus = require('http-status')
const { insert, findByOfferId, findByAdvertIdAndUserId } = require('../services/offer')

exports.create = async (req, res) => {
    console.log(req.body)
    const { user_type_id, user_id } = req.decoded
    if (user_type_id != 2)
        res.status(httpStatus.BAD_REQUEST).send({ message: "Sadece ziyaretçiler teklif oluşturabilir!" })
    req.body.user_id = user_id
    findByAdvertIdAndUserId(req.body).then((response) => {
        console.log("res", response)
        if (response) {
            console.log("girdi res")
            console.log("res null")
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
                result: false, message: 'İlgili ilana teklif vermiş bulunmaktasınız. İsterseniz teklifinizi güncelleyebilirsiniz.'
            })
        } else {
            insert(req.body)
            .then((response) => {
                res.status(httpStatus.CREATED).send({ result: true, data: response })
            })
            .catch((err) => {
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ result: false, message: err })
            })
        }
    }).catch((err) => {
        console.log(err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ result: false, message: err })
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