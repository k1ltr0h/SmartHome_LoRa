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
    id: {type:Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
    state: {type:Sequelize.BOOLEAN, allowNull: true},
    name: {type: Sequelize.STRING, allowNull: true},
    room_name: {type:Sequelize.STRING, allowNull: true}},
    { timestamps: false })

const rooms = sequelize.define('rooms', {
    id: {type:Sequelize.INTEGER, autoIncrement: true},
    name: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
    temp: {type:Sequelize.INTEGER, allowNull: true},
    humd: {type:Sequelize.INTEGER, allowNull: true}},
    { timestamps: false })

rooms.hasMany(lights, {foreignKey: 'room_name', sourceKey: 'name'})
lights.belongsTo(rooms, {foreignKey: 'room_name', sourceKey: 'name'})

module.exports = {lights, rooms};