const Sequelize = require('sequelize');
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