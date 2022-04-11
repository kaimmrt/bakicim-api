const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'].replace("Bearer", "").trim() || req.body.token || req.query.token;


    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.json({
                    status: false,
                    message: 'Failed to authenticate token.'
                });
            } else {

                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({
            status: false,
            message: 'No token provided.'
        });
    }
};

