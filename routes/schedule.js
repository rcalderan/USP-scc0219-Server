/**
 * person.js
    3672382 - Richard Carvalho Calderan
    958350- Jonatan Ricardo Catai

    define schedule routes
 */

var express = require('express');
var router = express.Router();

//database
var MongoDb = require('../mongoDb')
const scheduleSchema = require('../models/scheduleSchemma');

let schedules = new MongoDb(MongoDb.connect(), scheduleSchema);

//get all schedule
router.get('/', async function (req, res) {
   let result = await schedules.read({});
   if(result[0]._id===0)
      result.splice(0,1)
   res.send(result);
});

//get schedule by id
router.get('/:id([0-9]+)', async (req, res) => {
   let gotId = parseInt(req.params.id);
   let found = await schedules.read({ _id: gotId })
   const curr = found.filter(schedule => {
      if (schedule._id === gotId) {
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

//post schedule
router.post('/', async (req, res) => {
   try {
      //{ _id: 3, owner: 7,  service:"Grooming", description: "take Pipoca", date: new Date(2019, 11, 2, 19, 20, 0, 0) }
      if (
         !req.body.owner ||
         !req.body.service ||
         !req.body.description ||
         !req.body.date) {
         res.status(400);
         res.json({ message: "Bad Request" });
      } else {
         let created = await schedules.create(req.body);
         res.send({ message: "New schedule inserted.", _id: created._id });

      }
   } catch (error) {
      res.status(400);
      res.json({ message: "error: " + error.message });

   }
});

router.put('/:id([0-9]+)', async (req, res) => {
   if (
      !req.body.owner ||
      !req.body.service ||
      !req.body.description ||
      !req.body.date) {

      res.status(400);
      res.json({ message: "Bad Request" });
   } else {
      let gotId = parseInt(req.params.id);
      let schedule = req.body;
      schedule._id=gotId;
      let result = await schedules.update(gotId, schedule);
      if (result.nModified === 1)
         res.json({ message: "Schedule updated!" });
      else {
         res.status(404)
         res.json({ message: "Nothing changed" })
      }
   }
});

router.delete('/:id([0-9]+)', async (req, res) => {
   let gotId = parseInt(req.params.id);
   let result = await schedules.delete(gotId);
   if (result.n === 1) {
      res.json({message:"Schedule removed!"})
   } else {
      res.status(404);//Set status to 404 as movie was not found
      res.json({ message: "Not Found" });
   }
});


module.exports = router;