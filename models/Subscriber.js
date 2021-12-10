const mongoose= require('mongoose');

const Schema = mongoose.Schema;


const SubscriberSchema = new Schema({
          subEmail:{
              type: String,
          },

          date:{type: Date, default: Date.now}
});


module.exports = Subscriber = mongoose.model('subscribers', SubscriberSchema);



