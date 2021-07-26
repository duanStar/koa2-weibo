/**
 * @description error 404
 * @author Duan Hongfei
 */

const router = require('koa-router')()

// error
router.get('/error', async (ctx, next) => {
  await ctx.render('error')
})

// 404
router.get('/(.*)', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router 
