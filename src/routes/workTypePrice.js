const validate = require('../middleware/validate')
const schemas = require('../validations/WorkTypePrice')

const express = require('express');
const workTypePriceController = require('../controllers/workTypePriceController')
const router = express.Router();

router.get('/', workTypePriceController.getAll)
router.get('/:work_type_price_id', workTypePriceController.getByWorkTypePriceId)
router.get('/user/:user_id', workTypePriceController.getByUserId)
router.route("/").post(validate(schemas.createValidation), workTypePriceController.create)
router.route("/:work_type_price_id").put(validate(schemas.createValidation), workTypePriceController.update)
router.delete("/:work_type_price_id", workTypePriceController.delete)

module.exports = router;