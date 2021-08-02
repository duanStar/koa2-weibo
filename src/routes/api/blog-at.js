/**
 * @description atMe api 路由
 * @author Duan Hongfei
 */

const { getAtMeBlogList, } = require('../../controller/blog-at')
const { loginCheck, } = require('../../middlewares/loginCheck')
const { getBlogListStr, } = require('../../utils/blog')
const router = require('koa-router')()

router.prefix('/api/atMe')

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { id: userId, } = ctx.session.userInfo
  let { pageIndex, } = ctx.params
  pageIndex = parseInt(pageIndex)

  const result = await getAtMeBlogList(userId, pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router
