const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Asm')
        .catch((err)=>{
            console.log("Loi ket noi CSDL");
            console.log(err);
        });
module.exports = {mongoose};

//thi thay thế chữ localhost thành 127.0.0.1
