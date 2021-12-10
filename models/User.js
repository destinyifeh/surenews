const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
        
        username:{
            type: String,
        },
        email:{
            type: String
        },
        password:{
            type: String
        },
        confirm:{
            type: String
        },
        superAdmin:{
            type: Boolean,
            
        },

        date:{
            type: Date,
            default: Date.now,
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date,
});


module.exports = User = mongoose.model('users', UserSchema);