/**
 * @description 存储配置
 * @author Duan Hongfei
 */

const { isProd } = require('../utils/env')

let REDIS_CONF = {
  port: 6379,
  host: '12.0.0.0.1'
}

if (isProd) {
  REDIS_CONF = {
    // 线上环境
  }
}

module.exports = {
  REDIS_CONF
}