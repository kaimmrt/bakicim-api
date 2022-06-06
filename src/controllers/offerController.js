const httpStatus = require('http-status')
const { insert, findByOfferId, findByAdvertIdAndUserId, findByUserId, updateOfferPrice, removeOffer, findAcceptOffer,fetchAdvertsOffer,acceptOfferService,declineOfferService } = require('../services/offer')

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

exports.getByUserId = async (req, res) => {
    const { user_id } = req.decoded
    console.log(user_id)
    findByUserId(user_id)
        .then((response) => {
            if (response)
                res.status(httpStatus.OK).send({ result: true, data: response })
            else
                res.status(httpStatus.NOT_FOUND).send({ message: "bu id bilgisine ait sonuç bulunumadı!" })
        })
        .catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ result: false, message: err })
        })
}

exports.updateOffer = async (req, res) => {
    const { price, offer_id } = req.body

    findByOfferId(offer_id)
        .then((offer) => {
            if (offer) {
                updateOfferPrice({ offer_id, data: price }).then((response) => {
                    res.status(httpStatus.OK).send({ result: true, data: response })
                })
            } else {
                res.status(httpStatus.NOT_FOUND).send({ message: "bu id bilgisine ait sonuç bulunumadı!" })
            }
        }).catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ result: false, message: err })
        })
}

exports.deleteOffer = async (req, res) => {
    const { offer_id } = req.params

    findByOfferId(offer_id)
        .then((offer) => {
            if (offer) {
                removeOffer(offer_id).then((response) => {
                    res.status(httpStatus.OK).send({ result: true, data: response })
                })
            } else {
                res.status(httpStatus.NOT_FOUND).send({ result: false, message: "bu id bilgisine ait sonuç bulunumadı!" })
            }
        }).catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ result: false, message: err })
        })

}

exports.acceptOffer = async (req, res) => {
    const { offer_id } = req.body

    findByOfferId(offer_id)
        .then((offer) => {
            if (offer) {
                acceptOfferService(offer_id).then((response) => {
                    res.status(httpStatus.OK).send({ result: true, data: response })
                })
            } else {
                res.status(httpStatus.NOT_FOUND).send({ result: false, message: "bu id bilgisine ait sonuç bulunumadı!" })
            }
        }).catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ result: false, message: err })
        })
}

exports.declineOffer = async (req, res) => {
    const { offer_id } = req.body

    findByOfferId(offer_id)
        .then((offer) => {
            if (offer) {
                declineOfferService(offer_id).then((response) => {
                    res.status(httpStatus.OK).send({ result: true, data: response })
                })
            } else {
                res.status(httpStatus.NOT_FOUND).send({ result: false, message: "bu id bilgisine ait sonuç bulunumadı!" })
            }
        }).catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ result: false, message: err })
        })
}

exports.getAcceptOffer = async (req, res) => {
    const { user_id } = req.decoded
    findAcceptOffer(user_id)
        .then((adverts) => {
            res.status(httpStatus.OK).send({ result: true, data: adverts })
        })
        .catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        })
}

exports.getAdvertsOffer = async (req, res) => {
    const { user_id } = req.decoded
    const { advert_id } = req.params
    fetchAdvertsOffer(advert_id)
        .then((adverts) => {
            res.status(httpStatus.OK).send({ result: true, data: adverts })
        })
        .catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        })
}