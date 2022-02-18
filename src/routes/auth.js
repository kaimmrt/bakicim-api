const validate = require('../middleware/validate')
const schemas = require('../validations/Auth')

const express = require('express');
const authController = require('../controllers/authController')
const router = express.Router();

router.get('/', authController.getHomePage);
router.route("/register").post(validate(schemas.createValidation), authController.register)
router.route("/login").post(validate(schemas.loginValidation), authController.login)

module.exports = router;