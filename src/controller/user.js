/**
 * @description user controller
 * @author Duan  Hongfei
 */

const { getUserInfo, createUser, deleteUser, updateUser, } = require('../services/user')
const { SuccessModel, ErrorModel, } = require('../model/ResModel')
const { 
  registerUserNameNotExistInfo, 
  registerUserNameExistInfo, 
  registerFailInfo, 
  loginFailInfo, 
  deleteUserFailInfo,
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

/**
 * 删除当前用户
 * @param {string} userName 用户名
 */
async function deleteCurUser(userName) {
  const res = await deleteUser(userName)
  if(res) {
    return new SuccessModel()
  }
  return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改用户信息
 * @param {Object} ctx koa ctx
 * @param {sting} nickName 昵称
 * @param {sting} picture 图片地址
 * @param {sting} city 城市
 */
async function changeInfo(ctx, { nickName, picture, city, }) {
  const { userName, } = ctx.session.userInfo
  if(!nickName) {
    nickName = userName
  }
  const res = await updateUser({
    newNicName: nickName,
    newPicture: picture,
    newCity: city,
  }, { userName, })
  if(res) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture,
    })
    return new SuccessModel()
  }
  return new ErrorModel(changeInfoFailInfo)
}

module.exports = {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
}
