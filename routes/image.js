/**
 * person.js
    3672382 - Richard Carvalho Calderan
    958350- Jonatan Ricardo Catai

    define image routes
 */

var express = require('express');
var router = express.Router();
var multer = require('multer')

const upload = multer({
   dest: __dirname+"/uploaded",
   limits:{fileSize:1000000,files:1}
})

//database
var MongoDb = require('../mongoDb')
const imageSchema = require('../models/imageSchemma');

let images = new MongoDb(MongoDb.connect(), imageSchema);

router.get('/:id',async (req, res) => {
   try{
      
      let found = await images.read({ _id: req.params.id })
      if(found.length > 0){
         console.log('loading '+found[0].originalname)         
         res.sendFile(__dirname+"/uploaded/"+found[0].filename+found[0].imagetype);
      }else{
         res.send('not found.')
      }
   }catch(error){
      console.log(error)
   }
 })
 

//post image
router.post('/',upload.array('image',1), async (req, res) => {
   try {
      const image = req.files ? req.files[0] : req.body
      let created = await images.create(
         {
            imagetype:image.imagetype,
            filename:image.filename,
            originalname: image.originalname
         });
      res.send({ message: "New image uploaded", _id: created._id });
   } catch (error) {
      res.status(500);
      //console.log(error)
      res.json({ message: "error: " + error });

   }
});
//////////////////

module.exports = router;