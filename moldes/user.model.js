var db = require('./db');
const User = new db.mongoose.Schema(
    {
      
        ten: { type: String, require: true},
        email:{ type:String,require: true},
        sdt: {type: Number, require:true},
        passwrd: {type: String, require: true}
    },
    {
        collection: 'User'
    }
);
//--------------------------------------------------------------
//tạo model
let UserModel = db.mongoose.model('UserModel', User);
module.exports = {UserModel};