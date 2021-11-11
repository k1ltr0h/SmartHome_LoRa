const express = require('express');
const app = express();
const cors = require("cors");
var config = require('./config.json');  
var lights = require('./routes/lights.js');
const Sequelize = require('sequelize');
//const functions = require('firebase-functions');
//develop&testing

var corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
};

var dev = config.dev;
var password = dev.password ? dev.password : null; 
  
const sequelize = new Sequelize(  
    dev.database,  
    dev.user,  
    password, { 
        host: "localhost",
        dialect: "mysql",
        logging: console.log,  
        define: {  
            timestamps: false  
        }  
    }  
); 

app.all("*",cors(corsOptions));
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use('/data/lights', lights);

//exports.app = functions.https.onRequest(app);

app.listen(8080, "0.0.0.0", function(){
  console.log("Server encendido!");
});

module.exports = sequelize;