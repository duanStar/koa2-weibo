/**
 * @description 加密方法
 * @author Duan Hongfei
 */
const crypto = require('crypto')

// 密钥
const { CRYPTO_SECRET_KEY, } = require('../conf/secretKeys')

/**
 * md5 加密
 * @param {string} content 明文内容
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

/**
 * 加密
 * @param {string} content 明文内容
 * @returns {string} 加密内容
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = doCrypto
