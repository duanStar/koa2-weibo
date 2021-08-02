/**
 * @description 微博 @ 用户关系 service
 * @author Duan Hongfei
 */

const { AtRelation, } = require('../db/model')

/**
 * 创建 @ 关系
 * @param {number} blogId 微博 Id
 * @param {number} userId 用户 Id
 */
async function createAtRelation(blogId, userId) {
  const result = AtRelation.create({
    blogId,
    userId,
  })

  return result.dataValues
}

/**
 * 获取 @ 用户的微博数量
 * @param {number} userId 用户 Id
 */
async function getRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false,
    },
  })

  return result.count
}

module.exports = {
  createAtRelation,
  getRelationCount,
}
