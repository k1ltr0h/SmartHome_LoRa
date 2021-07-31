"use strict";
var express = require('express');
var router= express.Router();

module.exports = router;

var temp = 0;
var humd = 0;

router.get("/", function(req, res){
    console.log("Aquí estoy o.o");
    //res.send('<html><body><h1>Hello, World!</h1></body></html>');
    var json = {
        "Temperatura": temp,
        "Humedad": humd
    }
    res.send(json)
});

router.post("/update", function(req, res){
    //console.log(req.body);
    var data = req.body.data.split("\n")
    data.shift()
    console.log(data)
    var param = []
    for(var i = 0; data.length > i; i++){
        param.push(data[i].split(":"))
    }
    //console.log(param)
    temp = param[0][1]
    humd = param[1][1]
    //console.log(param[0][1])
    res.sendStatus(200);
});