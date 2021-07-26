/**
 * @description sequelize 实例
 * @author Duan Hongfei
 */

const { Sequelize } = require('sequelize')
const { isProd, isTest } = require('../utils/env')
const { MYSQL_CONF } = require('../conf/db')

const { host, password, user, database } = MYSQL_CONF

const conf = {
  host,
  dialect: 'mysql'
}

isTest && (
  conf.logging = false
)

isProd && (conf.pool = {
  max: 5,
  min: 0,
  idle: 10000 // 如果一个连接池10s内未被使用，则释放掉
})

const seq = new Sequelize(database, user, password, conf)

module.exports = seq