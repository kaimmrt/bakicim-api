const validate = require('../middleware/validate')
const schemas = require('../validations/Offer')

const express = require('express');
const offerController = require('../controllers/offerController')
const router = express.Router();

router.get("/:offer_id", offerController.getByOfferId)
router.get("/",offerController.getByUserId)
router.route("/").post(validate(schemas.createValidation), offerController.create)

module.exports = router;