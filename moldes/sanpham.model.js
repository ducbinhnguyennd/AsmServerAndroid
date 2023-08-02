var db = require('./db');

const spChema = new db.mongoose.Schema(
    {
      
        img:{ type: String, require: true},
        name: { type: String, require: true},
        noidung: {type: String, require:false},
        price:{ type:Number,require: true},
        id_theloai:{type: db.mongoose.Schema.Types.ObjectId, ref: 'theloaiMD'}
    },
    {
        collection: 'Sanpham'
    }
);

const theloaiChema = new db.mongoose.Schema(
    {
        name: {type:String,require:true}
    },
    {
        collection:'Theloai'
    }
);

//tạo model
let spModel = db.mongoose.model('spModel', spChema);
let theloaiMD = db.mongoose.model('theloaiMD',theloaiChema);
module.exports = {spModel, theloaiMD};