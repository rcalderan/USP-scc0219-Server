/**
 * person.js
    3672382 - Richard Carvalho Calderan
    958350- Jonatan Ricardo Catai

    define finance routes
 */

var express = require('express');
var router = express.Router();

//database
var MongoDb = require('../mongoDb')
const financeSchema = require('../models/financeSchemma');

let finance = new MongoDb(MongoDb.connect(), financeSchema);

//get all finance
router.get('/', async function (req, res) {
   let result = await finance.read({});
   res.send(result);
});

//get finance by id
router.get('/:id([0-9]+)', async (req, res) => {
   let gotId = parseInt(req.params.id);
   let found = await finance.read({ _id: gotId })
   const curr = found.filter(finance => {
      if (finance._id === gotId) {
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

//post finance
router.post('/', async (req, res) => {
   try {
      //{_id:6,customer:6,type:"service",date:new Date(2019,8,29,15,33),value:150.0}
      
      if (!req.body.customer ||
         !req.body.type ||
         !req.body.date ||
         !req.body.value ) {
         res.status(400);
         res.json({ message: "Bad Request" });
      } else {
         let created = await finance.create(req.body);
         res.send({ message: "New finance inserted.", _id: created._id });

      }
   } catch (error) {
      res.status(400);
      res.json({ message: "error: " + error });

   }
});

router.put('/:id([0-9]+)', async (req, res) => {
   
   if (!req.body.customer ||
      !req.body.type ||
      !req.body.date ||
      !req.body.value ) {

      res.status(400);
      res.json({ message: "Bad Request" });
   } else {
      let gotId = parseInt(req.params.id);
      let finance = req.body;
      finance._id=gotId;
      let result = await finance.update(gotId, finance);
      if (result.nModified === 1)
         res.json({ message: "Finance updated!" });
      else {
         res.status(404)
         res.json({ message: "Nothing changed" })
      }
   }
});

router.delete('/:id([0-9]+)', async (req, res) => {
   let gotId = parseInt(req.params.id);
   let result = await finance.delete(gotId);
   if (result.n === 1) {
      res.json({message:"Finance removed!"})
   } else {
      res.status(404);//Set status to 404 as movie was not found
      res.json({ message: "Not Found" });
   }
});


module.exports = router;