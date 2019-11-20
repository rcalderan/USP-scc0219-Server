/**
 * person.js
    3672382 - Richard Carvalho Calderan
    958350- Jonatan Ricardo Catai

    define persons routes
 */

var express = require('express');
var router = express.Router();

//database
var MongoDb = require('../mongoDb')
const animalSchema = require('../models/animalSchemma');

let animals = new MongoDb(MongoDb.connect(), animalSchema);

//get all animals
router.get('/', async function (req, res) {
   let result = await animals.read({});
   res.send(result);
});

//get user by id
router.get('/:id([0-9]+)', async (req, res) => {
   let gotId = parseInt(req.params.id);
   let found = await animals.read({ _id: gotId })
   const curr = found.filter(animal => {
      if (animal._id === gotId) {
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

//post animal
router.post('/', async (req, res) => {
   try {
      //{ _id: 7, owner: 3, type: "dog", race: "bodercolie", name: "Mr. Picles", photo: "imgsrc", age: new Date(2007,1,1) }
      
      if (!req.body.type ||
         !req.body.name ||
         !req.body.owner ||
         !req.body.race ||
         !req.body.age) {
         res.status(400);
         res.json({ message: "Bad Request" });
      } else {
         let created = await animals.create(req.body);
         res.send({ message: "New animal inserted.", _id: created._id });

      }
   } catch (error) {
      res.status(400);
      res.json({ message: "error: " + error });

   }
});

router.put('/:id([0-9]+)', async (req, res) => {
   if (!req.body.type ||
      !req.body.name ||
      !req.body.owner ||
      !req.body.race ||
      !req.body.age) {

      res.status(400);
      res.json({ message: "Bad Request" });
   } else {
      let gotId = parseInt(req.params.id);
      let animal = req.body;
      animal._id=gotId;
      let result = await animals.update(gotId, animal);
      if (result.nModified === 1)
         res.json({ message: "Animal updated!" });
      else {
         res.status(404)
         res.json({ message: "Nothing changed" })
      }
   }
});

router.delete('/:id([0-9]+)', async (req, res) => {
   let gotId = parseInt(req.params.id);
   let result = await animals.delete(gotId);
   if (result.n === 1) {
      res.json({message:"Animal removed!"})
   } else {
      res.status(404);//Set status to 404 as movie was not found
      res.json({ message: "Not Found" });
   }
});


module.exports = router;