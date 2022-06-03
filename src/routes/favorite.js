const validate = require('../middleware/validate')
const schemas = require('../validations/Favorite')

const express = require('express');
const favoriteController = require('../controllers/favoriteController')
const router = express.Router();

router.get("/", favoriteController.findAllByUser)
router.route("/").post(validate(schemas.createValidation), favoriteController.createOrDelete)


module.exports = router;