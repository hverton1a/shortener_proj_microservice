const Sequelize = require('sequelize');
const sqlite3 = require('sqlite3');

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
    logging: false,
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