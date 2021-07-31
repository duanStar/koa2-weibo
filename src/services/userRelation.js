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

module.exports = {
  getFansByFollower,
}
