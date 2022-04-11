const httpStatus = require('http-status')
const {
    insert,
    findAll,
    findByUserId,
    findByAdvertId,
    updateAdvert,
    deleteAdvert
} = require('../services/advert')

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

exports.getByAdvertId = async (req, res) => {
    if (!req.params.advert_id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "id bilgisi bulunamadı"
        })
    }
    findByAdvertId(req.params.advert_id)
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

    if (!req.params.advert_id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "id bilgisi bulunamadı"
        })
    }
    if (user_type_id != 1)
        res.status(httpStatus.BAD_REQUEST).send({ message: "Sadece bakıcılar ilan güncelleyebilir!" })
    req.body.user_id = user_id
    findByAdvertId(req.params.advert_id)
        .then((response) => {
            if (response) {
                updateAdvert({ advert_id: req.params.advert_id, data: req.body })
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
    if (!req.params.advert_id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message: "id bilgisi bulunamadı"
        })
    }
    if (user_type_id != 1)
        res.status(httpStatus.BAD_REQUEST).send({ message: "Sadece bakıcılar ilan silebilir!" })
    findByAdvertId(req.params.advert_id)
        .then((response) => {
            if (response) {
                deleteAdvert({ advert_id: req.params.advert_id })
                    .then((response) => {
                        res.status(httpStatus.OK).send({ result: true, data: response })
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
