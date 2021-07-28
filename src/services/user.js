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

/**
 * 更新用户信息
 * @param {Object} param0 要修改的内容 { newPassword, newNickName, newPicture, newCity }
 * @param {Object} param1 查询条件 { userName, password }
 */
async function updateUser({ newPassword, newNickName, newPicture, newCity, }, { userName, password, }) {
  // 拼接修改内容
  const updateData = {}
  newPassword && (updateData.password = newPassword)
  newNickName && (updateData.nickName = newNickName)
  newPicture && (updateData.picture = newPicture)
  newCity && (updateData.city = newCity)

  // 拼接查询条件
  const whereData = {
    userName,
  }
  password && (whereData.password = password)

  const result = await User.update(updateData, {
    where: whereData,
  })
  return result[0] > 0
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser,
}
