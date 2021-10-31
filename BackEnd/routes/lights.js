"use strict";
var express = require('express');
var router= express.Router();
var lights = require('../models/lights');

module.exports = router;

//var temp = 20;
//var humd = 15;

router.get("/", async function(req, res){
    //res.send('<html><body><h1>Hello, World!</h1></body></html>');
    await lights.findAll({
        
    }).then(us =>{
            res.json({
                type: true,
                data: us
            })
            console.log("Data obtenida correctamente.");
    })
    .catch(err =>{
        console.log(err);
        console.log("No exite ese usuario >:c");
        res.json({
            type: false,
            data: "No existe este usuario.",
            id: 0
        })
    })
});

router.post("/add", async function(req, res){

    console.log(req.body.name, req.body.area);

    await lights.create({ 
        name: req.body.name,
        area: req.body.area 
        })
        .then(us => { 
            console.log("Luz agregada de forma exitosa.");
            res.json({
                type: true,
                data: "Luz registrada exitosamente."
            });
        })
        .catch(error => {
            console.log(error);
            res.json({
                type: false,
                data: "Error, no se a podido registrar la luz."
            });
        }
    );
});

/*
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
});*/