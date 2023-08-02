var myMD = require('../moldes/sanpham.model');
var fs = require ('fs');

exports.home =async (req, res, next) => {
 // tạo chức năng lọc dữ liệu danh sách
    let dieu_kien_loc = null;
    if(typeof( req.query.price) !='undefined'){
        dieu_kien_loc = {price: req.query.price};
    }
    // hiển thị ds dữ liệu 
    var list = await myMD.spModel.find().populate('id_theloai');
    res.render('home/home.ejs',{listSP: list});
}

exports.belon =async (req, res, next) => {
    // tạo chức năng lọc dữ liệu danh sách
       let dieu_kien_loc = null;
       if(typeof( req.query.price) !='undefined'){
           dieu_kien_loc = {price: req.query.price};
       }
       // hiển thị ds dữ liệu 
       var list = await myMD.spModel.find(dieu_kien_loc).sort({price: 1}).populate('id_theloai');
       res.render('home/home.ejs',{listSP: list});
}

exports.lonbe =async (req, res, next) => {
// tạo chức năng lọc dữ liệu danh sách
    let dieu_kien_loc = null;
    if(typeof( req.query.price) !='undefined'){
        dieu_kien_loc = {price: req.query.price};
    }
    // hiển thị ds dữ liệu 
    var list = await myMD.spModel.find(dieu_kien_loc).sort({price: -1}).populate('id_theloai');
    res.render('home/home.ejs',{listSP: list});
}



exports.add = async (req, res, next) => {
    let msg ='';//dùng truyền ra view

    // load du lieu danh sach the loai dua ra view
    let list_TL = await myMD.theloaiMD.find();
    console.log(list_TL);

    if(req.method =='POST'){
        //kiểm tra hợp lệ dữ liệu

        //tạo đối tượng model để gán dữ liệu
        let objSP = new myMD.spModel();

        try {
            fs.renameSync(req.file.path, './public/uploads/' + req.file.originalname);
            msg = 'Url ảnh:  http://localhost:3000/uploads/' + req.file.originalname;
            objSP.img = '/uploads/'+ req.file.originalname;
        } catch (error) {
            msg = error.message;
        }

        objSP.name = req.body.name;
        objSP.noidung = req.body.noidung;
        objSP.price = req.body.price;
        objSP.id_theloai = req.body.theloai; // them id the loai
        //ghi vào CSDL
        try{
            let new_sp = await objSP.save();
            console.log(new_sp);
            msg = 'Lưu thành công';
        } catch(error){
            msg = 'Error'+ error.message(); 
            console.log(error);
        }
    }

    res.render('home/add.ejs',{msg:msg, list_TL: list_TL});
}

exports.edit = async (req, res, next) =>{
    let msg ='';//dùng truyền ra view

    let list_TL = await myMD.theloaiMD.find();
    console.log(list_TL);
    // load thong tin san pham
    let idsp = req.params.idsp;
    let objSP = await myMD.spModel.findById(idsp);
    
    if(req.method =='POST'){
        //kiểm tra hợp lệ dữ liệu

        //tạo đối tượng model để gán dữ liệu
        let objSP = new myMD.spModel();

        try {
            fs.renameSync(req.file.path, './public/uploads/' + req.file.originalname);
            msg = 'Url ảnh:  http://localhost:3000/uploads/' + req.file.originalname;
            objSP.img = '/uploads/'+ req.file.originalname;
        } catch (error) {
            msg = error.message;
        }

        objSP.name = req.body.name;
        objSP.noidung = req.body.noidung;
        objSP.price = req.body.price;
        objSP.id_theloai = req.body.theloai; // them id the loai

        objSP._id = idsp;
        //ghi vào CSDL
        try{
            // let new_sp = await objSP.save();
            // console.log(new_sp);

            await myMD.spModel.findByIdAndUpdate({_id: idsp}, objSP);
            msg = 'Cập nhật thành công';
        } catch(error){
            msg = 'Error'+ error.message(); 
            console.log(error);
        }
    }

    res.render('home/edit.ejs',{msg:msg, list_TL: list_TL, objSP: objSP})
}

exports.deleteSP =async (req,res,next) =>{
    let idsp = req.params.idsp
    try {
       await myMD.spModel.findByIdAndDelete({_id: idsp}); 
    } catch (error) {
        
    }
    res.redirect('/home/home');

    
}

exports.chitiet = async (req, res, next) => {
    
    let idsp = req.params.idsp;

    let objSP = await myMD.spModel.findById(idsp);
     
       res.render('home/chitiet.ejs',{objSP: objSP});
   }