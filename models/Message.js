const mongoose = require('mongoose')


const Schema = mongoose.Schema;


const MessageSchema = new Schema ({

                 messageName:{
                     type: String,
                 },

                 messageMail:{
                    type: String,
                },

                messageBody:{
                    type: String,
                },

                createdAt:{
                    type: Date,
                    default: Date.now
                },

                isRead:{
                    type: Boolean,
                    default: false,
                }

})


module.exports = Message = mongoose.model('messages', MessageSchema);