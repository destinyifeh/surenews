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


/*
router.post('/subscribers/mailist', (req, res)=>{
    console.log(req.body.mail)

       let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'mattdamon1134@gmail.com',
              pass: 'wonder5555',
           
        },
        tls:{
          rejectUnauthorized:false,
        }
    });

      fs.readFile('email.jsx', {encoding: 'utf-8'}, function(err, html){
          if(err){
              console.log(err)
          }
    var mailOptions = {
        to: user.email,
        from: 'Vicky interior designs admin password reset<noreply.mattdamon1134@gmail.com>',
        subject: 'Your password has been changed',
        html: html
      };

      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              console.log(error)
              res.status(400).json('Error:'+''+ error)
          }else{
              console.log(info.response)
              res.json('Email sent:' + " "+ info.response)
          }
      })
      //fs//
    })
       
})*/


module.exports = router;