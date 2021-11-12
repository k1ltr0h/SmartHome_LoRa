"use strict";
var express = require('express');
var router= express.Router();
const { lights, rooms } = require('../models/house');

module.exports = router;

router.post("/add", async function(req, res){
    console.log(req.body);

    await lights.create({ 
        name: req.body.lights.name,
        room_name: req.body.lights.room_name,
        state: req.body.lights.state
        }).then(async () =>{
            await rooms.create({ 
                name: req.body.name,
                lights_name: req.body.lights.name,
                temp: req.body.temp,
                humd: req.body.humd
            })
            .then(() =>{
                console.log("Habitación agregada correctamente.\n")
            })
            //.catch(() =>{
            //    console.log("No se ha podido agregar la habitación u.u\n")
            //})
        })
    res.sendStatus(200);
});

router.post("/update", async function(req, res){

    console.log(req.body);

    var new_data = req.body
    
    await rooms.findOne({ where: {name: req.body} })
        .then(function(obj) {
            // update
            if(obj)
                return obj.update(values);
            // insert
            return Model.create(values);
        }).catch(() =>{
            console.log("No se ha encontrado esa habitación. u.u\n");
        }).then(async ()=>{
            await rooms.create({ 
                name: req.body.name,
                lights_name: req.body.lights,
                temp: req.body.temp,
                humd: req.body.humd
            }).then(us => { 
                console.log("Habitación agregada de forma exitosa.");
                res.json({
                    type: true,
                    data: "Habitación registrada exitosamente ;D."
                });
            })
        })

    //console.log(req.body);
    /*
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
    */
    res.sendStatus(200);
});