/**
 * @description 微博 路由
 * @author Duan Hongfei
 */

const { loginRedirect, } = require('../../middlewares/loginCheck')
const router = require('koa-router')()
const { getProfileBlogList, } = require('../../controller/blog-profile')
const { getSquareBlogList, } = require('../../controller/blog-square')
const { isExist, } = require('../../controller/user')
const { getFans, } = require('../../controller/user-relation')

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

  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, pageIndex, pageSize, blogList, count, } = result.data

  const fansResult = await getFans(curUserInfo.id)
  const fansData = fansResult.data

  console.log(fansData)

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
      fansData: {
        count: fansData.count,
        list: fansData.userList,
      },
    },
  })
})

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
  const result = await getSquareBlogList(0)
  const { isEmpty, pageIndex, pageSize, blogList, count, } = result.data

  await ctx.render('square', {
    blogData: {
      isEmpty,
      pageIndex,
      pageSize,
      count,
      blogList,
    },
  })
})

module.exports = router
