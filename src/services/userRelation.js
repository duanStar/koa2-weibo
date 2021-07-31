/**
 * @description 用户关系 service
 * @author Duan Hongfei
 */

const { User, UserRelation, } = require('../db/model/index')
const { formatUser, } = require('./_format')

/**
 * 获取粉丝列表
 * @param {number} followerId 被关注人 Id
 */
async function getFansByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture', ],
    order: [
      ['id', 'desc',],
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId,
        },
      },
    ],
  })

  let userList = result.rows.map(item => item.dataValues)

  userList = formatUser(userList)

  return {
    count: result.count,
    userList,
  }
}

/**
 * 关注
 * @param {number} userId 关注人Id
 * @param {number} followerId 被关注人Id
 */
async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId,
  })

  return result.dataValues
}

/**
 * 取消关注
 * @param {number} userId 取消关注人Id
 * @param {number} followerId 被取消关注人Id
 */
async function removeFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId,
    },
  })

  return result > 0
}

module.exports = {
  getFansByFollower,
  addFollower,
  removeFollower,
}
