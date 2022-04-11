const validate = require('../middleware/validate')
const schemas = require('../validations/Advert')

const express = require('express');
const advertController = require('../controllers/advertController')
const router = express.Router();

router.get('/', advertController.getAll)
router.get('/:advert_id', advertController.getByAdvertId)
router.get('/user/:user_id', advertController.getByUserId)
router.route("/").post(validate(schemas.createValidation), advertController.create)
router.route("/:advert_id").put(validate(schemas.createValidation), advertController.update)
router.delete("/:advert_id", advertController.delete)

module.exports = router;