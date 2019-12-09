/**
 * person.js
    3672382 - Richard Carvalho Calderan
    958350- Jonatan Ricardo Catai

    define product routes
 */

var express = require('express');
var router = express.Router();

//database
var MongoDb = require('../mongoDb')
const serviceSchema = require('../models/serviceSchemma');

let services = new MongoDb(MongoDb.connect(), serviceSchema);

//get all service
router.get('/', async function (req, res) {
   let result = await services.read({});
   if(result[0]._id===0)
      result.splice(0,1)
   res.send(result);
});

//get service by id
router.get('/:id([0-9]+)', async (req, res) => {
   let gotId = parseInt(req.params.id);
   let found = await services.read({ _id: gotId })
   const curr = found.filter(service => {
      if (service._id === gotId) {
         return true;
      }
   });
   if (curr.length === 1) {
      res.json(curr[0])
   } else {
      res.status(404);//Set status to 404 as movie was not found
      res.json({ message: "Not Found" });
   }
});

//post service
router.post('/', async (req, res) => {
   try {//{_id:3,name:"Vacina",description:"Vacine seu animal!!!!",price:150.0},
      if (
         !req.body.name ||
         !req.body.description ||
         !req.body.price) {
         res.status(400);
         res.json({ message: "Bad Request" });
      } else {
         let created = await services.create(req.body);
         res.send({ message: "New service inserted.", _id: created._id });

      }
   } catch (error) {
      res.status(400);
      res.json({ message: "error: " + error });

   }
});

router.put('/:id([0-9]+)', async (req, res) => {
   if (
      !req.body.name ||
      !req.body.description ||
      !req.body.price) {

      res.status(400);
      res.json({ message: "Bad Request" });
   } else {
      let gotId = parseInt(req.params.id);
      let service = req.body;
      service._id=gotId;
      let result = await services.update(gotId, service);
      if (result.nModified === 1)
         res.json({ message: "Service updated!" });
      else {
         res.status(304)
         res.json({ message: "Nothing changed" })
      }
   }
});

router.delete('/:id([0-9]+)', async (req, res) => {
   let gotId = parseInt(req.params.id);
   let result = await services.delete(gotId);
   if (result.n === 1) {
      res.json({message:"Service removed!"})
   } else {
      res.status(404);//Set status to 404 as movie was not found
      res.json({ message: "Not Found" });
   }
});


module.exports = router;