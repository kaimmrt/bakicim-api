const express = require('express');
const advertTypeController = require('../controllers/advertTypeController')
const router = express.Router();

router.get('/', advertTypeController.getAll)

module.exports = router;