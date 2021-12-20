"use strict";
var express = require('express');
var router= express.Router();
var {lights, rooms} = require('../models/house');

module.exports = router;

//var temp = 20;
//var humd = 15;

//example: localhost:8080/data/lights?room_name=Balcón&name=Led_puerta --> Led_puerta de Balcón.
//example: localhost:8080/data/lights?room_name=Balcón --> todas las luces de Balcón.
//example: localhost:8080/data/lights --> todas las luces.

router.get("/", async function(req, res){
    //res.send('<html><body><h1>Hello, World!</h1></body></html>');

    if(req.query.name != null && req.query.room_name != null){
        console.log(req.query.name, req.query.room_name)
        await lights.findOne({
            where: {name: req.query.name, room_name: req.query.room_name}
        }).then(us =>{
                res.json({
                    type: true,
                    data: us
                })
                console.log("Data obtenida correctamente.");
        })
        .catch(err =>{
            console.log(err);
            console.log("No exite este objeto.");
            res.json({
                type: false,
                data: "No existe este objeto."
            })
        })
    }
    else if(req.query.room_name != null){
        console.log(req.query.name)
        await lights.findAll({
            where: {room_name: req.query.room_name}
        }).then(us =>{
                res.json({
                    type: true,
                    data: us
                })
                console.log("Data obtenida correctamente.");
        })
        .catch(err =>{
            console.log(err);
            console.log("No exite este objeto.");
            res.json({
                type: false,
                data: "No existe este objeto."
            })
        })
    }
    else{
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
            console.log("No exite este objeto.");
            res.json({
                type: false,
                data: "No existe este objeto."
            })
        })
    }
});

router.post("/add", async function(req, res){

    console.log(req.body.name, req.body.room_name, req.body.state);

    await lights.create({ 
        name: req.body.name,
        room_name: req.body.room_name,
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

router.put("/update", async function(req, res){

    await lights.findOne({ where: {room_name: req.body.room_name, name: req.body.name} })
        .then(async function(obj) {
            // update
            console.log(obj)
            await obj.update({
                state: req.body.state
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

});

router.delete("/delete", async function(req, res){

    await lights.findOne({ where: {room_name: req.body.room_name, name: req.body.name} })
        .then(async function(obj) {
            // update
            console.log(obj)
            await obj.destroy();
            console.log("Datos eliminados.\n");
            res.json({
                type: true,
                data: "Datos eliminados."
            })
        }).catch(() =>{
            console.log("No se ha encontrado esa Luz.\n");
            res.json({
                type: false,
                data: "Error al eliminar los datos."
            })
        })

});