/**
 * @description user API 路由
 * @author Duan Hongfei
 */

const router = require('koa-router')()
const { isExist, register, login, deleteCurUser, } = require('../../controller/user')
const { genValidator, } = require('../../middlewares/validator')
const { isTest, } = require('../../utils/env')
const userValidate = require('../../validator/user')
const { loginCheck, } = require('../../middlewares/loginCheck')

router.prefix('/api/user')


// 注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender, } = ctx.request.body
  ctx.body = await register({ userName, password, gender, })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName, } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password, } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delete', loginCheck, async (ctx, next) => {
  if(isTest){
    // 用来做接口测试,避免多余数据
    const { userName, } = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName) 
  }
})

module.exports = router
