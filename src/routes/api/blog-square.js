/**
 * @description 广场 api 路由
 * @author Duan Hongfei
 */

const router = require('koa-router')()
const { getSquareBlogList, } = require('../../controller/blog-square')
const { getBlogListStr, } = require('../../utils/blog')
const { loginCheck, } = require('../../middlewares/loginCheck')

router.prefix('/api/square')


// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async(ctx, next) => {
  let { pageIndex, } = ctx.params
  pageIndex = parseInt(pageIndex)

  const result = await getSquareBlogList(pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

module.exports = router
