/**
 * @description 微博 路由
 * @author Duan Hongfei
 */

const { loginRedirect, } = require('../../middlewares/loginCheck')
const router = require('koa-router')()

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

module.exports = router
