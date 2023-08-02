var md = require('../moldes/user.model')

exports.register = async (req, res, next) => {

    let msg = ' ';
    if(req.method == 'POST'){
        console.log(req.body);
        // kiem tra hop  le
        if(req.body.passwrd != req.body.passwrd2){
            msg = 'Xác nhận pasword không hợp lệ';
            return  res.render('settings/register', {msg: msg});
        }


        let objU = md.UserModel();
        objU.ten = req.body.ten;
        objU.email = req.body.email;
        objU.sdt = req.body.sdt;
        objU.passwrd = req.body.passwrd;
        
        try {
            await objU.save();
            msg = 'Đăng ký thành công';
        } catch (error) {
            msg = error.messgage;
        }

    }


    res.render('settings/register', {msg: msg});
}

exports.login = async (req, res, next) => {

    let msg = ' ';
    if(req.method == 'POST'){
        //  lấy thông  tin dựa vào username
        try {        
            let objU =  await md.UserModel.findOne({ten: req.body.ten}); 
            console.log(objU);

            if(req.body.ten == ""  ){
            
                msg= 'mời nhập tên đăng nhập';

            }else{
                if(objU != null){
                    // có tồn tại user == kiểm tra password
                    if(objU.passwrd == req.body.passwrd){
                        // đúng pass = login
                        req.session.userLogin = objU;
                        // chuyển trang về màn hình chính hoạc danh sách
                        return res.redirect('/home/home');
                    }else{
                        msg = 'sai password';
                    }
                }else{
                    msg = 'User không tồn tại: '+ req.body.ten;
                }
                
            }

        } catch (error) {
           
        }
    }

    
    res.render('settings/login', {msg: msg});
}