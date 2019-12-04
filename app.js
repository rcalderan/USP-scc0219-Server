/**
 * app.js
    3672382 - Richard Carvalho Calderan
    958350- Jonatan Ricardo Catai
 */

var express = require('express');
var bodyParser = require('body-parser')
var app = express();
//routes
const persons = require('./routes/person')
const animals = require('./routes/animal')
const products = require('./routes/product')
const services = require('./routes/service')
const carts = require('./routes/cart')
const schedules = require('./routes/schedule')
const finance = require('./routes/finance')

const image = require('./routes/image')

//set static folder
app.use(express.static('public'));

//body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//user
//mount router
app.get('/', function(req, res){
   res.send("Hello world!");
});
//test
app.get('/api', function(req, res){
   res.send("API!!!");
});

//adicionado o prefixo /api nas rotas para dar match no proxy do vue
app.use("/api/person",persons);
app.use("/api/animal",animals);
app.use("/api/product",products);
app.use("/api/service",services);
app.use("/api/cart",carts);
app.use("/api/schedule",schedules);
app.use("/api/finance",finance);
app.use("/api/image",image);

app.listen(8081);


module.exports = app;