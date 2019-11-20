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
const personSchema = require('../models/personSchemma')

let persons = new MongoDb(MongoDb.connect(), personSchema);

//get all users
router.get('/', async function (req, res) {
   let result = await persons.read({});
   res.send(result);
});

//get user by id
router.get('/:id([0-9]+)', async (req, res) => {
   let gotId = parseInt(req.params.id);
   let found = await persons.read({ _id: gotId })
   const curr = found.filter(user => {
      if (user._id === gotId) {
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

//post person
router.post('/', async (req, res) => {
   try {

      //Check if all fields are provided and are valid:
      // { _id: 1, type: "admin", name: "administer", photo: "", phone: "(16) 99721-2588", email: "admin", password: "admin" },
      if (!req.body.type ||
         !req.body.name ||
         !req.body.password ||
         !req.body.email ||
         !req.body.phone) {
         res.status(400);
         res.json({ message: "Bad Request" });
      } else {
         let created = await persons.create(req.body);
         
         res.send({ message: "New user created.", id: created._id });

      }
   } catch (error) {
      res.status(400);
      res.json({ message: "error: " + error });

   }
});

router.put('/:id([0-9]+)', async (req, res) => {
   //Check if all fields are provided and are valid:
   // { _id: 1, type: "admin", name: "administer", photo: "", phone: "(16) 99721-2588", email: "admin", password: "admin" },
   if (!req.body.type ||
      !req.body.name ||
      !req.body.password ||
      !req.body.email ||
      !req.body.phone) {

      res.status(400);
      res.json({ message: "Bad Request" });
   } else {
      let gotId = parseInt(req.params.id);
      let user = req.body;
      user._id=gotId;
      let result = await persons.update(gotId, user);
      if (result.nModified === 1)
         res.json({ message: "Person updated!" });
      else {
         res.status(404)
         res.json({ message: "Nothing changed" })
      }
   }
});

router.delete('/:id([0-9]+)', async (req, res) => {
   let gotId = parseInt(req.params.id);
   let result = await persons.delete(gotId);
   console.log(result);
   if (result.n === 1) {
      res.json({message:"Person removed!"})
   } else {
      res.status(404);//Set status to 404 as movie was not found
      res.json({ message: "Not Found" });
   }
});


module.exports = router;