"use strict";
var express = require('express');
var router= express.Router();
var lights = require('../models/house');

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

    console.log(req.body.name, req.body.area, req.body.state);

    await lights.create({ 
        name: req.body.name,
        area: req.body.area,
        state: req.body.state
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