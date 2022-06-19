const Sequelize = require('sequelize')

const db = {}

const sequelize = new Sequelize("dumbmerch", "postgres", "postgres", {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    logging: console.log,
    freezeTableName: true,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize

module.exports = db;