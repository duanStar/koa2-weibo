/**
 * @description user view 路由
 * @author Duan Hongfei
 */

const router = require('koa-router')()

/**
 * 获取登录信息
 * @param {Object} ctx koa ctx 
 */
function getLoginInfo(ctx) {
  let data = {
    isLogin: false,
  }
  const userInfo = ctx.session.userInfo
  if(userInfo) {
    data = {
      isLogin: true,
      userName: userInfo.userName,
    }
  }
  return data
}

// login
router.get('/login', async (ctx, next) => {
  await ctx.render('login', getLoginInfo(ctx))
})

// register
router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

module.exports = router
