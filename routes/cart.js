/**
 * person.js
    3672382 - Richard Carvalho Calderan
    958350- Jonatan Ricardo Catai

    define cart routes
 */

var express = require('express');
var router = express.Router();

//database
var MongoDb = require('../mongoDb')
const cartSchema = require('../models/cartSchemma');

let carts = new MongoDb(MongoDb.connect(), cartSchema);

//get all carts
router.get('/', async function (req, res) {
   let result = await carts.read({});
   if(result[0]._id===0)
      result.splice(0,1)
   res.send(result);
});

//get cart by id
router.get('/:id([0-9]+)', async (req, res) => {
   let gotId = parseInt(req.params.id);
   let found = await carts.read({ _id: gotId })
   const curr = found.filter(cart => {
      if (cart._id === gotId) {
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

//post cart
router.post('/', async (req, res) => {
   try {
      //{ _id: 5, owner: 7, product:1, description: "Arranhador",count:2, value: 120.99 }
      if (
         !req.body.owner ||
         !req.body.description ||
         !req.body.product ||
         !req.body.value) {
         res.status(400);
         res.json({ message: "Bad Request" });
      } else {
         let created = await carts.create(req.body);
         res.send({ message: "New cart inserted.", _id: created._id });

      }
   } catch (error) {
      res.status(400);
      res.json({ message: "error: " + error });

   }
});

router.put('/:id([0-9]+)', async (req, res) => {
   if (
      !req.body.owner ||
      !req.body.description ||
      !req.body.product ||
      !req.body.value) {

      res.status(400);
      res.json({ message: "Bad Request" });
   } else {
      let gotId = parseInt(req.params.id);
      let cart = req.body;
      cart._id=gotId;
      let result = await carts.update(gotId, cart);
      if (result.nModified === 1)
         res.json({ message: "Cart updated!" });
      else {
         res.status(404)
         res.json({ message: "Nothing changed" })
      }
   }
});

router.delete('/:id([0-9]+)', async (req, res) => {
   let gotId = parseInt(req.params.id);
   let result = await carts.delete(gotId);
   if (result.n === 1) {
      console.log(result.data)
      res.json({message:"Cart removed!"})
   } else {
      res.status(404);//Set status to 404 as movie was not found
      res.json({ message: "Not Found" });
   }
});


module.exports = router;