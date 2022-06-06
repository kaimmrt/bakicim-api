const validate = require('../middleware/validate')
const schemas = require('../validations/Offer')

const express = require('express');
const offerController = require('../controllers/offerController')
const router = express.Router();

router.get("/:offer_id", offerController.getByOfferId)
router.route("/").post(validate(schemas.createValidation), offerController.create)

router.get("/",offerController.getByUserId)
router.get("/",offerController.getAcceptOffer)

router.route("/").put(validate(schemas.updateValidation), offerController.updateOffer)
router.route("/accept").put(validate(schemas.statusUpdateValidation), offerController.acceptOffer)
router.route("/decline").put(validate(schemas.statusUpdateValidation), offerController.declineOffer)
router.delete("/:offer_id", offerController.deleteOffer)

module.exports = router;