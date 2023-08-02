var express = require('express');
var router = express.Router();
var api_sp = require('../controllers/api/sanpham.api');

router.get('/sanpham',api_sp.list);

module.exports = router;