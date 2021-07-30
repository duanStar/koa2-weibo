/**
 * @description 微博 路由
 * @author Duan Hongfei
 */

const { loginRedirect, } = require('../../middlewares/loginCheck')
const router = require('koa-router')()
const { getProfileBlogList, } = require('../../controller/blog-profile')
const { isExist, } = require('../../controller/user')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {})
})

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName, } = ctx.session.userInfo
  ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName
  let curUserInfo

  const { userName: curUserName, } = ctx.params
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, pageIndex, pageSize, blogList, count, } = result.data
  const isMe = myUserName === curUserName
  if (isMe) {
    // 是当前登录用户
    curUserInfo = myUserInfo
  } else {
    // 不是当前登录用户
    const existResult = await isExist(curUserName)
    if (existResult.errno !== 0) {
      // 用户名不存在
      return
    }
    // 用户名存在
    curUserInfo = existResult.data
  }

  await ctx.render('profile', {
    blogData: {
      isEmpty,
      pageIndex,
      pageSize,
      count,
      blogList,
    },
    userData: {
      userInfo: curUserInfo,
      isMe,
    },
  })
})

module.exports = router
