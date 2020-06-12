const Sequelize = require('sequelize')
const env = require('dotenv')
const conf = require('./conf')

env.config()
// const sequelize = new Sequelize(conf.database,conf.username,conf.password, {
//     dialect: 'mysql',
//     host: conf.host,
//    // opeoperatorsAliases: false
// })

const sequelize = new Sequelize("kkb", "root", "yuan950817", {
    host: "localhost",
    dialect: "mysql",
    // operatorsAliases: false,
    pool: {
        max: 10,
        min: 0,
        idle: 30000
    }
});
module.exports = sequelize;