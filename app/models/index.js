const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.enquete = require("./enquete.model.js")(sequelize, Sequelize);
db.option = require("./optionEnquete.model.js")(sequelize, Sequelize);
db.vote = require("./votacato.model")(sequelize,Sequelize);

  db.enquete.hasMany(db.option,{as: 'options', foreignKey: 'enqueteId'})
  db.option.hasMany(db.vote,{as: 'votes', foreignKey: 'optionId'})



module.exports = db;