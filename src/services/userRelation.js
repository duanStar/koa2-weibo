/**
 * @description 用户关系 service
 * @author Duan Hongfei
 */

const { User, UserRelation, } = require('../db/model/index')
const { formatUser, } = require('./_format')
const { Op, } = require('sequelize')

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
          userId: {
            [Op.ne]: followerId,
          },
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

/**
 * 获取关注人列表
 * @param {FanId} followerId 粉丝 Id
 */
async function getFollowersByUser(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [
      ['id', 'desc',],
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture', ],
      },
    ],
    where: {
      userId,
      followerId: {
        [Op.ne]: userId,
      },
    },
  })

  let userList = result.rows.map(item => item.dataValues)

  userList = userList.map(item => {
    const user = item.user.dataValues
    item.user = formatUser(user)
    return user
  })

  return {
    count: result.count,
    userList,
  }
}

module.exports = {
  getFansByFollower,
  addFollower,
  removeFollower,
  getFollowersByUser,
}
