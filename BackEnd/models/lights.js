"use strict";
//Dependences
const Sequelize = require('sequelize');
var config = require('../config.json'); 

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

const lights = sequelize.define('lights', {
    id: { type:Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING, allowNull: false},
    area: {type:Sequelize.STRING, allowNull: false}},
    { timestamps: false })

module.exports = lights;