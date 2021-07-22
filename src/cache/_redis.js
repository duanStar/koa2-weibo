/**
 * @description 连接redis
 * @author Duan Hongfei
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error(err)
})

/**
 * redis set
 * @param {string} key key
 * @param {string} value value
 * @param {number} timeout 过期时间，单位 s
 */
function set(key, value, timeout = 60 *60) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  redisClient.set(key, value)
  redisClient.expire(key, value, timeout)
}

/**
 * redis get
 * @param {string} key key
 * @returns {promise} value
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if (err) {
        reject(err)
        return
      }
      if (value == null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(value))
      } catch(err) {
        resolve(value)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}
