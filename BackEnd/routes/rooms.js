"use strict";
var express = require('express');
var router= express.Router();
const { lights, rooms } = require('../models/house');

module.exports = router;

router.get("/", async function(req, res){

    if(req.query.name != null){
        console.log(req.query.name)
        await rooms.findOne({
            where: {name: req.query.name}
        }).then(objs =>{
                res.json({
                    type: true,
                    data: objs
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

        await rooms.findAll({
            
        }).then(objs =>{
                res.json({
                    type: true,
                    data: objs
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

    console.log(req.body.data);

    if(req.body.data != null){ // MCU request

        var data = req.body.data.split("\n")
        data.shift()
        console.log(data)
        console.log("o.o")
        var param = []
        for(var i = 0; data.length > i; i++){
            param.push(data[i].split(":"))
        }
        console.log(param)
        let temp_ = param[0][1]
        let humd_ = param[1][1]
        console.log(param[2][1].split(" ")[1])
        let room_name =  param[2][1].split(" ")[1]

        await rooms.findOne({ where: {name: room_name} })
        .then(async function(obj) {
            // update
            console.log(obj)
            await obj.update({
                temp: temp_,
                humd: humd_
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
    }

    else{
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
    }
});

router.delete("/delete", async function(req, res){

    await rooms.findOne({ where: {name: req.body.name} })
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
            console.log("No se ha encontrado esa habitación.\n");
            res.json({
                type: false,
                data: "Error al eliminar los datos."
            })
        })

});