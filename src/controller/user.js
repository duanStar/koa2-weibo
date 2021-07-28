/**
 * @description user controller
 * @author Duan  Hongfei
 */

const { getUserInfo, createUser, } = require('../services/user')
const { SuccessModel, ErrorModel, } = require('../model/ResModel')
const { 
  registerUserNameNotExistInfo, 
  registerUserNameExistInfo, 
  registerFailInfo, 
  loginFailInfo, 
} = require('../model/ErrorInfo')
const doCrypto = require('../utils/cryp')

/**
 * 判断用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo =  await getUserInfo(userName)
  if(userInfo) {
    return new SuccessModel(userInfo)
  }else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }
}

/**
 * 注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 */
async function register({ userName, password, gender, }) {
  const userInfo =  await getUserInfo(userName)
  if(userInfo) {
    return new ErrorModel(registerUserNameExistInfo)
  }
  try{
    await createUser({ userName, password: doCrypto(password), gender, })
    return new SuccessModel()
  }catch(err) {
    console.error(err.message, err.stack)
    return new ErrorModel(registerFailInfo)
  }
}

/**
 * 
 * @param {Object} ctx koa2 ctx
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if(!userInfo) {
    return new ErrorModel(loginFailInfo)
  }
  if(ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login,
}