/**
 * @description 个人主页 api 路由
 * @author Duan Hongfei
 */

const { loginCheck, } = require('../../middlewares/loginCheck')
const router = require('koa-router')()
const { getProfileBlogList, follow, unFollow, } = require('../../controller/blog-profile')
const { getBlogListStr, } = require('../../utils/blog')

router.prefix('/api/profile')

// 加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName,pageIndex, } = ctx.params
  pageIndex = parseInt(pageIndex)

  const result = await getProfileBlogList(userName, pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList)

  ctx.body = result
})

// 关注
router.post('/follow', loginCheck, async (ctx, next) => {
  const { id: myUserId, } = ctx.session.userInfo
  const { userId: curUserId, } = ctx.request.body

  ctx.body = await follow(myUserId, curUserId)
})

// 取消关注
router.post('/unFollow', loginCheck, async (ctx, next) => {
  const { id: myUserId, } = ctx.session.userInfo
  const { userId: curUserId, } = ctx.request.body

  ctx.body = await unFollow(myUserId, curUserId)
})

module.exports = router
