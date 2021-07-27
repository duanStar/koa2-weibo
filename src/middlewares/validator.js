/**
 * @description 数据校验中间件
 * @author Duan Hongfei
 */

const { jsonSchemaFileInfo, } = require('../model/ErrorInfo')
const { ErrorModel, } = require('../model/ResModel')
 
/**
 * 生成 json schema 验证中间件
 * @param {Function} validateFn 验证函数
 */
function genValidator(validateFn){
  return async (ctx, next) => {
    const error = validateFn(ctx.request.body)
    if(error) {
      ctx.body = new ErrorModel(jsonSchemaFileInfo)
    }else {
      await next()
    }
  }
}

module.exports = {
  genValidator,
}
