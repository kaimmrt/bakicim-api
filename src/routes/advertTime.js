const express = require('express');
const advertTimeController = require('../controllers/advertTimeController')
const router = express.Router();

router.get('/', advertTimeController.getAll)

module.exports = router;