const multer = require('multer');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

dotenv.config();



var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb (null, 'public/uploads')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + "_" + file.originalname);
    }
});

function fileFilter(req, file, cb){
     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' 
     || file.mimetype === 'image/png'){
         cb(null, true)
     }else{
         cb(new Error ('Unsupported file type'), false);
     }
}


cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Api_Key,
    api_secret: process.env.Api_Secret
}); 




module.exports = upload = multer({storage: storage, fileFilter:fileFilter, limit:{filesize:1000000}});

