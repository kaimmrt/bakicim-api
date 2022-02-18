const CryptoJs = require("crypto-js");
const jwt = require('jsonwebtoken')

const passwordToHash = (password) => {
    return CryptoJs.HmacSHA256(password, CryptoJs.HmacSHA1(password, process.env.PASSWORD_HASH).toString()).toString()
}

const generateAccessToken = (user) => {
    return jwt.sign(
        { name: user.username, user_type_id: user.user_type_id, user_id: user.user_id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "1w" }
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign({ name: user.username, user_type_id: user.user_type_id, user_id: user.user_id, email: user.email }, process.env.REFRESH_TOKEN_SECRET_KEY)
}

module.exports = {
    passwordToHash,
    generateAccessToken,
    generateRefreshToken
}