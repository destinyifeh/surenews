const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('cookie-session');
const passport = require('passport');
const path = require('path');
const nodemailer = require('nodemailer');
const env = require('dotenv');
const fs = require('fs');
const inLineCss = require('nodemailer-juice');
 require('./config/passport')(passport);

 env.config({path:'./.env'});
 
const app = express();

mongoose.Promise = global.Promise;
//Production//
if(process.env.NODE_ENV === 'production'){
mongoose.connect(process.env.mongoConnection, {
  useUnifiedTopology: true, useNewUrlParser: true
})
.then(()=>console.log('Mongodb connected'))
.catch(err=>console.log(err)); 
}else{
    mongoose.connect(process.env.localConnection, {
        useUnifiedTopology: true, useNewUrlParser: true
   })
   .then(()=>console.log('Mongodb connected'))
   .catch(err=>console.log(err));
}


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());

app.use(session({
    cookie:{secure: true, maxAge: 60000},
     secret: 'secret',
     resave: false,
     saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


//send mail







app.post('/subscribers/mailist', (req, res)=>{
     console.log(req.body.mail)
 
        let transporter = nodemailer.createTransport({
         host: 'smtp.gmail.com',
         port: 465,
         secure: true,
         auth: {
               user: process.env.EMAIL_USER,
               pass: process.env.EMAIL_PASS,
            
         },
         tls:{
           rejectUnauthorized:false,
         }
     });
 
      fs.readFile('./client/build/email.html', {encoding: 'utf-8'}, function(err, html){
           if(err){
               console.log(err)
           }
     var mailOptions = {
         bcc: req.body.mail,
         from: `Surenews<noreply.${process.env.EMAIL_USER}>`,
         subject: 'Surenews Weekly Newsletter',
         html: html,
        
       };
       transporter.use('compile', inLineCss());
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
        
 })

app.get('/mail/template', (req, res)=>{
     res.sendFile(path.join(__dirname, 'client/public/email.html'))
});



 app.use('/', require('./routes/news'));
app.use('/', require('./routes/message'));
app.use('/', require('./routes/subscriber'));
app.use('/', require('./routes/user'));

//Serving the build index react file to server//
app.use(express.static(path.join(__dirname, 'client/build')))

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname,  'client', 'build', 'index.html'));
});
    


app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), ()=>console.log('Server up and running on port'+" "+ app.get('port')));