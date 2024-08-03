var express = require('express');
var router = express.Router();
var { calculateTax } = require('../controllers/calculationController');
// var { db, bucket } = require('../utils/Firebase');
// const { getProjectsThumbnail } = require('../controllers/projectsController');

/* GET home page. */
router.post('/', calculateTax);

module.exports = router;
