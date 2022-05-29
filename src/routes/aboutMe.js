const validate = require('../middleware/validate')
const schemas = require('../validations/Auth')

const express = require('express');
const aboutMeController = require('../controllers/aboutMeController')
const router = express.Router();

router.post("/", aboutMeController.getMe)
router.put("/update/:id", aboutMeController.updateProfile)

module.exports = router;