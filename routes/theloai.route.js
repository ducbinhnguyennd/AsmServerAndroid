var express = require('express');
var router = express.Router();

var theloaiController = require('../controllers/theloai.controller');

router.get('/list', theloaiController.dsTL);
router.post('/list', theloaiController.dsTL);

router.get('/add', theloaiController.addTL);
router.post('/add', theloaiController.addTL);

router.get('/edit/:idTL', theloaiController.editTL);
router.post('/edit/:idTL', theloaiController.editTL);


router.get('/deleteTL/:idTL', theloaiController.deleteTL);
router.post('/deleteTL/:idTL', theloaiController.deleteTL);

module.exports = router;