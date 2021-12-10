const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
          
            title:{
                type:String,
            },
            detail:{
                type: String,
            },
            image:[{type: String}],
             
            cloudinary_id:[{type: String}],

            allowComment:{
                type: Boolean,
                default: true
            }, 
            
            slug:{
                type: String,
                unique: true,
                required: true,
            },

             views:{type: Number, default: 0},
              
             comments:[{
                 commentBody:{
                     type: String,
                 },
                 commentDate:{
                     type: Date,
                     default: Date.now
                 }
             }],

            createdAt:{
                type: Date,
                default: Date.now,
            }
        

})


NewsSchema.pre('validate', function(){
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
});


module.exports = News = mongoose.model('news', NewsSchema);