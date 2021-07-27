/**
 * @description user controller
 * @author Duan  Hongfei
 */

const { getUserInfo, } = require('../services/user')
const { SuccessModel, ErrorModel, } = require('../model/ResModel')
const { registerUserNameNotExistInfo, } = require('../model/ErrorInfo')

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

module.exports = {
  isExist,
}
