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
const productSchema = require('../models/productSchemma');

let products = new MongoDb(MongoDb.connect(), productSchema);

//get all product
router.get('/', async function (req, res) {
   let result = await products.read({});
   res.send(result);
});

//get product by id
router.get('/:id([0-9]+)', async (req, res) => {
   let gotId = parseInt(req.params.id);
   let found = await products.read({ _id: gotId })
   const curr = found.filter(product => {
      if (product._id === gotId) {
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

//post product
router.post('/', async (req, res) => {
   try {
      //{_id:2,name:"Tapete Higienico",description:"Tapete mega higienico",photo:"/assets/tapete_higienico_lavavel_1.jpg",price:20.0,stock:18,sold:2},
      if (
         !req.body.name ||
         !req.body.description ||
         !req.body.price ||
         !req.body.sold ||
         !req.body.stock) {
         res.status(400);
         res.json({ message: "Bad Request" });
      } else {
         let created = await products.create(req.body);
         res.send({ message: "New product inserted.", _id: created._id });

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
      !req.body.price ||
      !req.body.sold ||
      !req.body.stock) {

      res.status(400);
      res.json({ message: "Bad Request" });
   } else {
      let gotId = parseInt(req.params.id);
      let product = req.body;
      product._id=gotId;
      let result = await products.update(gotId, product);
      if (result.nModified === 1)
         res.json({ message: "Product updated!" });
      else {
         res.status(404)
         res.json({ message: "Nothing changed" })
      }
   }
});

router.delete('/:id([0-9]+)', async (req, res) => {
   let gotId = parseInt(req.params.id);
   let result = await products.delete(gotId);
   if (result.n === 1) {
      res.json({message:"Product removed!"})
   } else {
      res.status(404);//Set status to 404 as movie was not found
      res.json({ message: "Not Found" });
   }
});


module.exports = router;