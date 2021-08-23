const {  DataTypes } = require("sequelize");
const database = require('../src/db.js');

const Url = database.define('Url',{
  id: {
    type: DataTypes.INTEGER,
    allowNull:false,
    autoIncrement: true,
    primaryKey: true
  },
  url:{
    type: DataTypes.STRING, 
    allowNull:false,
    unique:true
  }
});

module.exports =  Url ;
