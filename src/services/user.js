/**
 * @description user service
 * @author Duan Hongfei
 */

const { User, } = require('../db/model/index')
const { formatUser, } = require('./_format')

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  const whereOpt = {
    userName,
  }
  if(password) {
    Object.assign(whereOpt, { password, })
  }

  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city',],
    where: whereOpt,
  })
  if(result == null) {
    return result
  }

  const formatRes = formatUser(result.dataValues)
  return formatRes
}

/**
 * 插入新用户
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} gender 性别
 * @param {string} nickName 昵称
 */
async function createUser({ userName, password, gender = 3, nickName, }) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName,
  })
  return result.dataValues
}

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName,
    },
  })
  return result > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
}
