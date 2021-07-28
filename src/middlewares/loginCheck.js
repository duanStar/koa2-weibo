/**
 * @description 登录验证中间件
 * @author Duan Hongfei
 */

const { loginCheckFailInfo, } = require('../model/ErrorInfo')
const { ErrorModel, } = require('../model/ResModel')

/**
 * API 登录验证
 * @param {Object} ctx koa ctx
 * @param {Function} next koa next
 * @returns 
 */
async function loginCheck(ctx, next) {
  if(ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  ctx.body = new ErrorModel(loginCheckFailInfo)
}

/**
 * 页面 登录验证
 * @param {Object} ctx koa ctx
 * @param {Function} next koa next
 */
async function loginRedirect(ctx, next) {
  if(ctx.session && ctx.session.userInfo) {
    await next()
    return
  }
  const url = ctx.url
  ctx.redirect(`/login?url=${encodeURIComponent(url)}`)
}

module.exports = {
  loginCheck,
  loginRedirect,
}
