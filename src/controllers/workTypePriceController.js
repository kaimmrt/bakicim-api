const httpStatus = require('http-status')
const {
    insert,
    findAll,
    findByUserId,
    findByWorkTypePriceId,
    updateWorkTypePrice,
    deleteWorkTypePrice
} = require('../services/workTypePrice')

exports.create = async (req, res) => {
    const { user_type_id, user_id } = req.decoded;
    if (user_type_id != 1)
        res.status(httpStatus.BAD_REQUEST).send({ message: "Sadece bakıcılar ilan verebilir!" })
    req.body.user_id = user_id
    insert(req.body)
        .then((response) => {
            res.status(httpStatus.CREATED).send({ result: true, data: response })
        })
        .catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        })
}

exports.getAll = async (req, res) => {
    findAll()
        .then((response) => {
            res.status(httpStatus.OK).send({ result: true, data: response })
        })
        .catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        })
}

exports.getByUserId = async (req, res) => {
    if (!req.params.user_id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "id bilgisi bulunamadı"
        })
    }
    findByUserId(req.params.user_id)
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

exports.getByWorkTypePriceId = async (req, res) => {
    if (!req.params.work_type_price_id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "id bilgisi bulunamadı"
        })
    }
    findByWorkTypePriceId(req.params.work_type_price_id)
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

exports.update = async (req, res) => {
    const { user_type_id, user_id } = req.decoded;

    if (!req.params.work_type_price_id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "id bilgisi bulunamadı"
        })
    }
    if (user_type_id != 1)
        res.status(httpStatus.BAD_REQUEST).send({ message: "Sadece bakıcılar ilan güncelleyebilir!" })
    req.body.user_id = user_id
    findByWorkTypePriceId(req.params.work_type_price_id)
        .then((response) => {
            if (response) {
                updateWorkTypePrice({ work_type_price_id: req.params.work_type_price_id, data: req.body })
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

exports.delete = async (req, res) => {
    const { user_type_id } = req.decoded;
    if (!req.params.work_type_price_id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "id bilgisi bulunamadı"
        })
    }
    if (user_type_id != 1)
        res.status(httpStatus.BAD_REQUEST).send({ message: "Sadece bakıcılar ilan silebilir!" })
    findByWorkTypePriceId(req.params.work_type_price_id)
        .then((response) => {
            if (response) {
                deleteWorkTypePrice({ work_type_price_id: req.params.work_type_price_id })
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
