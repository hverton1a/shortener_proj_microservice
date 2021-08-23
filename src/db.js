const Sequelize = require('sequelize');
const fs = require('fs');
const sqlite3 = require('sqlite3');

//const Database = require('sqlitec');

 //(()=>{ 
 //    let db = new sqlite3.Database('../shortener_proj_microservice/db.sqlite', (err) => {
 //   if (err) {
 //     return console.error(err.message);
 //   }
 //   //console.log('Connected to the in-memory SQlite database.');
 //   db.close();
 // });})();

function create_db (){
  let db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
}

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false,//console.log,
    define: {
          freezeTableName: true
    }
  });

  (async()=>{
    try {
      await database.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
})();


 
module.exports = database;