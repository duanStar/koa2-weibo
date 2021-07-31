/**
 * @description 用户关系 controller
 * @author Duan Hongfei
 */

const { SuccessModel, } = require('../model/ResModel')
const { getFansByFollower, } = require('../services/userRelation')

/**
 * 获取粉丝列表
 * @param {number} userId 用户Id
 */
async function getFans(userId) {
  const { count, userList, } = await getFansByFollower(userId)

  return new SuccessModel({
    count,
    userList,
  })
}

module.exports = {
  getFans,
}
