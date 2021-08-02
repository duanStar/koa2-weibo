/**
 * @description 微博 路由
 * @author Duan Hongfei
 */

const { loginRedirect, } = require('../../middlewares/loginCheck')
const router = require('koa-router')()
const { getProfileBlogList, } = require('../../controller/blog-profile')
const { getSquareBlogList, } = require('../../controller/blog-square')
const { isExist, } = require('../../controller/user')
const { getFans, getFollowers, } = require('../../controller/user-relation')
const { getHomeBlogList, } = require('../../controller/blog-home')
const { getAtMeCount, getAtMeBlogList, markAsRead, } = require('../../controller/blog-at')

// 首页
router.get('/', loginRedirect, async (ctx, next) => {
  const myUserInfo = ctx.session.userInfo
  const userId = myUserInfo.id

  // 首页微博第一页数据
  const result = await getHomeBlogList(userId, 0)
  const { isEmpty, pageIndex, pageSize, blogList, count, } = result.data

  // 粉丝数据
  const fansResult = await getFans(userId)
  const fansData = fansResult.data

  // 关注人数据
  const followersResult = await getFollowers(userId)
  const followersData = followersResult.data

  // 获取 @ me微博数量
  const atCountResult = await getAtMeCount(userId)
  const { atCount, } = atCountResult.data

  await ctx.render('index', {
    blogData: {
      isEmpty,
      pageIndex,
      pageSize,
      count,
      blogList,
    },
    userData: {
      userInfo: myUserInfo,
      fansData: {
        count: fansData.count,
        list: fansData.userList,
      },
      followersData: {
        count: followersData.count,
        list: followersData.userList,
      },
      atCount,
    },
  })
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

  // 关注人数据
  const followersResult = await getFollowers(curUserInfo.id)
  const followersData = followersResult.data

  // 是否关注此人
  const amIFollowed = fansData.userList.some(item => item.id === myUserInfo.id)

  // 获取 @ me微博数量
  const atCountResult = await getAtMeCount(myUserInfo.id)
  const { atCount, } = atCountResult.data

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
      followersData: {
        count: followersData.count,
        list: followersData.userList,
      },
      atCount,
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

// atMe
router.get('/at-me', loginRedirect, async (ctx, next) => {
  const { id: userId, } = ctx.session.userInfo

  // 获取 @ me微博数量
  const atCountResult = await getAtMeCount(userId)
  const { atCount, } = atCountResult.data

  // 获取第一页列表
  const result = await getAtMeBlogList(userId, 0)
  const { isEmpty, pageIndex, pageSize, blogList, count, } = result.data

  await ctx.render('atMe', {
    atCount,
    blogData: {
      isEmpty,
      pageIndex,
      pageSize,
      count,
      blogList,
    },
  })

  // 标记已读
  if (atCount > 0) {
    markAsRead(userId)
  }
})

module.exports = router
