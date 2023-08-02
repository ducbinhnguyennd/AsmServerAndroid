var express = require('express');
var router = express.Router();
var api_theloai = require('../controllers/api/theloai.api');

router.get('/theloai',api_theloai.list);

module.exports = router;