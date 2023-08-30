'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')["development"];
const db = {};


const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.userModel = require("./userModel.js")(sequelize, Sequelize)

module.exports = db;
