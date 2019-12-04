/**
 * person.js
    3672382 - Richard Carvalho Calderan
    958350- Jonatan Ricardo Catai

    define image routes
 */

var express = require('express');
var router = express.Router();
var multer = require('multer')
var path = require('path')
const fs = require('fs')

const UPLOAD_PATH = path.resolve(__dirname, '/assets/images')
const upload = multer({
   dest: __dirname+"/uploaded",
   limits:{fileSize:1000000,files:1}
})

//database
var MongoDb = require('../mongoDb')
const imageSchema = require('../models/imageSchemma');

let images = new MongoDb(MongoDb.connect(), imageSchema);

/*
//get images by name
router.get('/:name', async (req, res) => {
   let gotName = parseInt(req.params.name);
   let found = await images.read({ imagename: gotName })
   const curr = found.filter(img => {
      if (img.filename === gotName) {
         return true;
      }
   });
   if (curr.length === 1) {
      res.json(curr[0])
   } else {
      res.status(404);//Set status to 404 as movie was not found
      res.json({ message: "Not Found" });
   }
});*/
// get image with id

router.get('/:id',async (req, res) => {
   try{
      
      let found = await images.read({ _id: req.params.id })
      if(found.length > 0){
         console.log(found[0].originalname)
         
         res.sendFile(__dirname+"/uploaded/"+found[0].filename+".jpg");
         //fs.createReadStream(__dirname+"/uploaded").pipe(res)
         //console.log('Uploaded sucessfull: '+found.data.filename)
      }else{
         res.send('not found.')
      }
/*
      let found = await images.read({ _id: id })
      if(found.status===200){
         console.log('Uploaded sucessfull: '+found.data.filename)
      }

      /**
       * 
   Image.findOne({_id: req.params.id}, (err, image) => {
     if (err) return res.sendStatus(404)
     fs.createReadStream(path.resolve(UPLOAD_PATH, image.filename)).pipe(res)
   })*/
       
   }catch(error){
      console.log(error)
   }
 })
 

//post image
router.post('/',upload.array('image',1), async (req, res) => {
   try {
      const image =req.files[0]
      let created = await images.create(
         {
            filename:image.filename,
            originalname: image.originalname
         });
      res.send({ message: "New image uploaded", _id: created._id });
   } catch (error) {
      res.status(400);
      console.log(error)
      res.json({ message: "error: " + error });

   }
});
//////////////////

module.exports = router;