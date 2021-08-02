/**
 * @description 微博 @ 用户关系 controller
 * @author Duan Hongfei
 */

const { getRelationCount, } = require('../services/atRelation')
const { SuccessModel, } = require('../model/ResModel')

/**
 * 获取 @ 我的微博数量
 * @param {number} userId 用户 Id
 */
async function getAtMeCount(userId) {
  const atCount = await getRelationCount(userId)

  return new SuccessModel({ atCount, })
}

module.exports = {
  getAtMeCount,
}
