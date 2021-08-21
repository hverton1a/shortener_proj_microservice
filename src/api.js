require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const Sequelize = require('sequelize');



let db = new sqlite3.Database('db.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

(async ()=>{
  const database = new Sequelize({
    dialect: 'sqlite',
    storage:'./db.sqlite'
  });
  const Url = require('../models/models.js');

  try{
    await database.syn();
   //console.log(resultado);

    const resultadoCreate = await Url.create({
      url:'http://www.google.com'
    });
    console.log(resultadoCreate);
  } catch(err){
    console.log(err);
  }

})();



db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});