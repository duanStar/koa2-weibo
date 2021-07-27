/**
 * @description json schema 校验
 * @author Duan Hongfei
 */

const Ajv = require('ajv')

const ajv = new Ajv({
  // allErrors: true,
})

/**
 * 验证数据格式
 * @param {Object} schema json schema 规则
 * @param {Object} data 数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data)
  if(!valid) {
    return ajv.errors[0]
  }
}

module.exports = validate
