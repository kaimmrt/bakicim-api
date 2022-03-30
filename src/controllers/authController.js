const httpStatus = require('http-status')
const { passwordToHash, generateAccessToken, generateRefreshToken } = require('../scripts/utils/helper')
const { insert, findOneByEmail } = require('../services/auth')

exports.getHomePage = async (req, res, next) => {
    res.send("Bakıcım.com")
}

exports.register = async (req, res) => {
    req.body.password = passwordToHash(req.body.password)
    findOneByEmail(req.body.email)
        .then((response) => {
            if (response)
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Bu email adresi kullanılmakta" })
            else {
                insert(req.body)
                    .then((response) => {
                        res.status(httpStatus.CREATED).send(response)
                    })
                    .catch((e) => {
                        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
                    })
            }
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

exports.login = async (req, res) => {
    req.body.password = passwordToHash(req.body.password)
    findOneByEmail(req.body.email)
        .then((user) => {
            if (user) {
                if (user.password != req.body.password)
                    res.status(httpStatus.NOT_FOUND).send({ message: "Kullanıcı adı veya şifre hatalı!" })
                else {
                    user = {
                        ...user.dataValues,
                        token: generateAccessToken(user)
                    }


                    res.json({
                        result: true,
                        user: user
                    });
                }
            }
            else
                res.status(httpStatus.NOT_FOUND).send({ message: "Kullanıcı adı veya şifre hatalı!" })
        })
        .catch((err) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err)
        })

}