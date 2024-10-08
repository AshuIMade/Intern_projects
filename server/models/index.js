// index.js
const dbConfig = require("../config/dbConfig.js");
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database.');
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Correctly importing models without .default
db.users = require('./userModel')(sequelize, DataTypes);
db.bills = require('./billModle')(sequelize, DataTypes);
const UserAPI = require('./userapi')(sequelize, Sequelize.DataTypes);
db.UserAPI = UserAPI;

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synchronized successfully.');
    });

module.exports = db;
