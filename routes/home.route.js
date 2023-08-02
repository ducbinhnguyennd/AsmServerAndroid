var express = require('express');
var router = express.Router();
var check_login = require ('../middlewares/check_login');
var homeController = require('../controllers/home.controller');

var multer = require('multer');
var uploader = multer( { dest: './tmp'} );


router.get('/home', check_login.yeu_cau_login, homeController.home);
router.post('/home', homeController.home);

router.get('/belon',  homeController.belon);
router.post('/belon', homeController.belon);

router.get('/lonbe',  homeController.lonbe);
router.post('/lonbe', homeController.lonbe);

router.get('/add', homeController.add);
router.post('/add', uploader.single('file_anh'), homeController.add);

router.get('/home/edit/:idsp', homeController.edit);
router.post('/home/edit/:idsp',uploader.single('file_anh'), homeController.edit);

router.get('/home/deleteSP/:idsp', homeController.deleteSP);
router.post('/home/deleteSP/:idsp', homeController.deleteSP);

router.get('/chitiet/:idsp', homeController.chitiet);
router.post('/chitiet/:idsp', homeController.chitiet);


module.exports = router;