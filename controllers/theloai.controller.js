var myMD = require('../moldes/sanpham.model');

exports.dsTL =async (req, res, next) => {
 // tạo chức năng lọc dữ liệu danh sách
    // let dieu_kien_loc = null;
    // if(typeof( req.query.price) !='undefined'){
    //     dieu_kien_loc = {price: req.query.price};
    // }
    // hiển thị ds dữ liệu 
    var list_dstl = await myMD.theloaiMD.find().sort({name:1});
    res.render('theloai/danhsach.ejs',{list_dstl: list_dstl});
}

exports.addTL = async (req, res, next) => {

    let msg ='';//dùng truyền ra view
    var list_dsTL = await myMD.theloaiMD.find().sort({name:1});

    // load du lieu danh sach the loai dua ra view
    console.log(list_dsTL);

    if(req.method =='POST'){
        //kiểm tra hợp lệ dữ liệu

        //tạo đối tượng model để gán dữ liệu
        let obj_ds_tl = new myMD.theloaiMD();
        obj_ds_tl.name = req.body.name;
        //ghi vào CSDL
        try{
            let new_sp = await obj_ds_tl.save();
            console.log(new_sp);
            msg = 'Lưu thành công';
        } catch(error){
            msg = 'Error'+ error.message(); 
            console.log(error);
        }
    }

    res.render('theloai/add.ejs',{msg:msg, list_dsTL: list_dsTL});
}

exports.editTL = async (req, res, next) =>{
    let msg ='';//dùng truyền ra view

    let list_dstl = await myMD.theloaiMD.find();
    console.log(list_dstl);
    // load thong tin san pham
    let idTL= req.params.idTL;
    let obj_ds_tl = await myMD.theloaiMD.findById(idTL);
    
    if(req.method =='POST'){
        //kiểm tra hợp lệ dữ liệu

        //tạo đối tượng model để gán dữ liệu
        let obj_ds_tl = new myMD.theloaiMD();
        obj_ds_tl.name = req.body.name;

        obj_ds_tl._id = idTL;
        //ghi vào CSDL
        try{
            await myMD.theloaiMD.findByIdAndUpdate({_id: idTL}, obj_ds_tl);
            msg = 'Cập nhật thành công';
        } catch(error){
            msg = 'Error'+ error.message(); 
            console.log(error);
        }
    }

    res.render('theloai/edit.ejs',{msg:msg, list_dsTL: list_dstl, obj_ds_tl: obj_ds_tl});
}

exports.deleteTL =async (req,res,next) =>{
    let idTL=req.params.idTL
    try {
       await myMD.theloaiMD.findByIdAndDelete({_id: idTL}); 
    } catch (error) {
        
    }
    res.redirect('/theloai/list');
}