const express = require('express');
const router = express.Router();

require('../models/Message');


router.post('/email-messages', async(req, res)=>{
    console.log(req.body)

    let messages = {
          messageBody: req.body.messageBody,
           messageName: req.body.messageName,
           messageMail: req.body.messageMail,
    }
     
    console.log(messages)
      await Message.create(messages)
      .then(data=>res.json(data))
      .catch(err=>res.status(400).json('Error:' + " "+ err))
})


router.get('/email-messages', (req, res)=>{
        Message.find({isRead:false})
        .then(data=>res.json(data))
        .catch(err=>res.status(400).json('Error:'+ " "+ err))
})


router.get('/mail-messages', (req, res)=>{
    Message.find({isRead:false}).sort({createdAt:-1})
    .then(data=>res.json(data))
    .catch(err=>res.status(400).json('Error:'+ " "+ err))
})



router.get('/read-messages', (req, res)=>{
    Message.find({isRead:true}).sort({createdAt:-1})
    .then(data=>res.json(data))
    .catch(err=>res.status(400).json('Error:'+ " "+ err))
})



router.get('/message/:id', async(req, res)=>{
    try{
       let message = await Message.findOne({_id: req.params.id})
       message.isRead=true;
       message.save()
       .then(data=>res.json(data))
       .catch(err=>res.status(400).json('Error:' + " "+ err))
    }
    catch(err){
        console.log(err.message)
    }
})


router.delete('/delete/message/:id', async(req, res)=>{
    try{
         await Message.findOneAndDelete({_id: req.params.id})
         .then(()=>res.json('Message deleted'))
         .catch(err=>res.status(400).json('Error:'+" "+ err))
             
         
    }
    catch(err){
        console.log(err.message)
    }
})
module.exports = router;