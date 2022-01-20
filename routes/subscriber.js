const express = require('express');
//const nodemailer = require('nodemailer');
//const fs = require('fs');
const router = express.Router();


require('../models/Subscriber');



router.post('/subscription/email', (req, res)=>{

    let subscription={
          subEmail: req.body.subEmail,
    }
     console.log(subscription)
      Subscriber.create(subscription)
     .then(data=>res.json(data))
     .catch(err=>res.status(400).json('Error:' + " "+ err))
})

router.get('/email/subscribers', (req, res)=>{
       Subscriber.find({}).sort({date:-1})
       .then(subscribers=>res.json(subscribers))
       .catch(err=>res.status(400).json('Error:' + " "+ err))
})

router.delete('/remove-mail/list/:id', async(req, res)=>{
    try{
      console.log(req.params)

      Subscriber.findOneAndDelete({_id: req.params.id})
      .then(()=>res.json('Emailremoved from mail-list'))
      .catch(err=>res.status(400).json('Error:'+ " "+ err))
    }
    catch(err){
        console.log(err.message)
    }
});




module.exports = router;