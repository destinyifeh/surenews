const express = require('express');
const router = express.Router();
const fs = require('fs');
const upload = require('../middlewares/multer');
const uploadMethod = require('../middlewares/uploadMethod');
require('../models/News')

router.post('/news', upload.array('image'), async(req, res)=>{
          try{
            console.log(req.files)
            const urls = [];
         const files = req.files;
         for(const file of files){
             const {path} = file;
             const newPath = await uploadMethod(path)
             urls.push(newPath)
            fs.unlinkSync(path)
         } 

          let newPost = {
              title: req.body.title,
              detail: req.body.detail,
              allowComment: req.body.allowComment,
             image: urls.map(url=>url.result),
              cloudinary_id: urls.map(url=>url.id),
          }
           console.log(newPost)
           News.create(newPost)
           .then(newPost=>{
               console.log(newPost)
               res.json(newPost)
           })
          .catch(err=>res.json('Error:'+ err))
           
           
          }
          catch(err){
              console.log(err.message)
          }

});


router.get('/news', async(req, res)=>{
    try{
     News.find({}).sort({createdAt:-1}).limit(3)
       .then(news=>res.json(news))
       .catch(err=>res.status(400).json('Error:' + err))
    }
    catch(err){
        console.log(err.mesage)
    }
    
})



router.get('/showPost/:slug', async(req, res)=>{
    try{
         await News.findOne({slug: req.params.slug})
         .then(news=>{
             news.views++;
             news.save()
           //  console.log(news)
             .then(showPost=>res.json(showPost))
             .catch(err=>res.status(400).json('Error:' + err))
         })
       
    }
    catch(err){
        console.log(err.message)
    }
})

router.post('/comment/news/:slug', async(req, res)=>{
    try{
        console.log(req.body)
        await News.findOne({slug: req.params.slug})
        .then(news=>{
            let newComment = {
                commentBody: req.body.commentBody
            }
            console.log(newComment)
            news.comments.unshift(newComment)
            //console.log(news)
            news.save()
            .then(news=>res.json(news))
            .catch(err=>res.status(400).json('Error:' + err))
        })
    }
    catch(err){
        console.log(err.message)
    }
})

router.get('/comment/news/:slug', async(req, res)=>{
    try{
        await News.findOne({slug: req.params.slug})
        .then(comment=>res.json(comment))
        .catch(err=>res.status(400).json('Error:' + err))
    }
    catch(err){
        console.log(err.message)
    }
})


router.delete('/delete/news/:slug', async(req, res)=>{
        
         try{
              console.log(req.params)
              News.findOneAndDelete({slug: req.params.slug})
              .then(()=>res.json('News deleted'))
              .catch(err=>res.status(400).json('Error:' + err))
         }
       catch(err){
           console.log(err.message)
       }
}) 

router.get('/editNews/:slug', async(req, res)=>{
    try{
    console.log(req.params)
       News.findOne({slug: req.params.slug})
       .then(news=>res.json(news))
       .catch(err=>res.status(400).json('Error:'+err))

    }
    catch(err){
        console.log(err.message)
    }
})



router.put('/updateNews/:slug', upload.array('image'), async(req, res)=>{
     try{
         console.log(req.params)
         await News.findOne({slug: req.params.slug})
         .then(news=>{
             news.title = req.body.title,
             news.detail = req.body.detail,
             news.allowComment = req.body.allowComment,
             console.log(news)
              news.save()
             .then(news=>res.json(news))
             .catch(err=>res.status(400).json('Error:'+ ''+ err))
         })
     }
     catch(err){
         console.log(err.message)
     }
})


router.get('/similar/news/:slug',  async(req, res)=>{
    try{
           let news = await News.findOne({slug: req.params.slug})
           
               let q = new RegExp(news.title, 'i')
                  News.find({slug:{$nin: news.slug}, $or:[{title:q}]}).sort({createdAt:-1})
               // console.log(q)
                .then(similar=>res.json(similar))
               .catch(err=>res.status(400).json('Error:'+''+err))
           
    }
    catch(err){
        console.log(err.message)
    }
})



router.get('/recent/news/:slug',  async(req, res)=>{
    try{
    let news = await News.findOne({slug: req.params.slug})

    News.find({ slug:{$nin: news.slug}}).sort({createdAt:-1}).skip(3).limit(3)
    .then(news=>res.json(news))
    .catch(err=>res.status(400).json('Error:'+''+ err))
    }
    catch(err){
        console.log(err.message)
    }
})



router.get('/recent/news',  async(req, res)=>{
    try{

    News.find({}).sort({createdAt:-1}).skip(3).limit(3)
    .then(news=>res.json(news))
    .catch(err=>res.status(400).json('Error:'+''+ err))
    }
    catch(err){
        console.log(err.message)
    }
})




router.get('/trending/news', (req, res)=>{
    News.find({}).sort({views:-1}).limit(3)
    .then(news=>res.json(news))
    .catch(err=>res.status(400).json('Error:'+''+ err))
});







router.get('/interests/news', (req, res)=>{
    News.find({}).sort({createdAt:-1}).skip(1).limit(3)
    .then(news=>res.json(news))
    .catch(err=>res.status(400).json('Error:'+''+ err))
})





router.get('/breakings/news', (req, res)=>{
    News.find({}).sort({createdAt:-1}).limit(6)
    .then(news=>res.json(news))
    .catch(err=>res.status(400).json('Error:'+''+ err))
})




router.get('/paginated/news', async(req, res)=>{
    try{
     News.find({}).sort({createdAt:-1})
       .then(news=>res.json(news))
       .catch(err=>res.status(400).json('Error:' + err))
    }
    catch(err){
        console.log(err.mesage)
    }
    
});

module.exports = router;