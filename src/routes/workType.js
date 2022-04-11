const express = require('express');
const workTypeController = require('../controllers/workTypeController')
const router = express.Router();

router.get('/', workTypeController.getAll)

module.exports = router;