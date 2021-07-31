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

  // 微博第一页数据
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, pageIndex, pageSize, blogList, count, } = result.data

  // 粉丝数据
  const fansResult = await getFans(curUserInfo.id)
  const fansData = fansResult.data

  // 是否关注此人
  const amIFollowed = fansData.userList.some(item => item.id === myUserInfo.id)

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
      amIFollowed,
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
