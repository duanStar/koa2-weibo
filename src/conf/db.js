/**
 * @description 存储配置
 * @author Duan Hongfei
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '12.0.0.0.1'
}

let MYSQL_CONF = {
  host: 'localhost',
  dialect: 'mysql',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'koa2_weibo_db'
}

if (isProd) {
  REDIS_CONF = {
    // 线上环境
  }
  MYSQL_CONF = {
    host: 'localhost',
    dialect: 'mysql',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'koa2_weibo_db'
  }
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}