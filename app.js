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


app.use("/person",persons);

app.listen(8081);


module.exports = app;