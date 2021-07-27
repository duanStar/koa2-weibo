/**
 * @description user view 路由
 * @author Duan Hongfei
 */

const router = require('koa-router')()

// login
router.get('/login', async (ctx, next) => {
  await ctx.render('login', {})
})

// register
router.get('/register', async (ctx, next) => {
  await ctx.render('register', {})
})

module.exports = router
