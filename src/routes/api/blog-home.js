/**
 * @description 首页 api 路由
 * @author Duan Hongfei
 */

const router = require('koa-router')()
const { loginCheck, } = require('../../middlewares/loginCheck')
const { create, getHomeBlogList, } = require('../../controller/blog-home')
const { genValidator, } = require('../../middlewares/validator')
const blogValidate = require('../../validator/blog')
const { getBlogListStr, } = require('../../utils/blog')

router.prefix('/api/blog')

// 创建博客
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content, image, } = ctx.request.body
  const { id: userId, } = ctx.session.userInfo

  ctx.body = await create(userId, content, image)
})

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { id: userId, } = ctx.session.userInfo
  const { pageIndex, } = ctx.params

  const result = await getHomeBlogList(userId, parseInt(pageIndex))
  result.data.blogListTpl = getBlogListStr(result.data.blogList, true)

  console.log(result.blogListTpl)

  ctx.body = result
})

module.exports = router
