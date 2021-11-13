"use strict";
var express = require('express');
var router= express.Router();
const { lights, rooms } = require('../models/house');

module.exports = router;

router.post("/add", async function(req, res){
    console.log(req.body);

    await rooms.create({ 
        name: req.body.name,
        temp: req.body.temp,
        humd: req.body.humd
    })
    .then(() =>{
        console.log("Habitación agregada correctamente.\n")
        res.json({
            type: true,
            data: "Habitación registrada exitosamente."
        });
    })
    .catch((err) =>{
        console.log("No se ha podido agregar la habitación.\n" + err)
        res.json({
            type: false,
            data: "habitación registrada exitosamente."
        });
    })
});

router.put("/update", async function(req, res){

    console.log(req.body);

    var new_data = req.body
    
    await rooms.findOne({ where: {name: req.body.name} })
        .then(async function(obj) {
            // update
            console.log(obj)
            await obj.update({
                temp: req.body.temp,
                humd: req.body.humd
            });
            console.log("Datos de la habitación actualizados.\n");
            res.json({
                type: true,
                data: "Datos actualizados."
            })
        }).catch(() =>{
            console.log("No se ha encontrado esa habitación.\n");
            res.json({
                type: false,
                data: "Error al actualizar los datos."
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
});