/**
 * @description blog api 路由
 * @author Duan Hongfei
 */

const router = require('koa-router')()
const { loginCheck, } = require('../../middlewares/loginCheck')

router.prefix('/api/blog')

// 创建博客
router.post('/create', loginCheck, async (ctx, next) => {
  const { content, imgUrl, } = ctx.request.body
})

module.exports = router
