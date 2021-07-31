const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser')

var data = require('./routes/data.js');

var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};

app.all("*",cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/data', data);

app.listen(8080, "0.0.0.0", function(){
  console.log("Server encendido!");
})