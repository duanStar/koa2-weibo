/**
 * @description 微博 @ 用户关系 service
 * @author Duan Hongfei
 */

const { AtRelation, Blog, User, } = require('../db/model')
const { formatBlog, formatUser, } = require('./_format')

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

/**
 * 获取 @ 用户微博列表
 * @param {number} userId 用户 Id
 * @param {number} pageIndex 页码
 * @param {number} pageSize 每页大小
 */
async function getAtUserBlogList(userId, pageIndex = 0, pageSize = 10) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc',],
    ],
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId',],
        where: {
          userId,
        },
      },
      {
        model: User,
        attributes: ['nickName', 'userName', 'picture',],
      },
    ],
  })

  let blogList = result.rows.map(item => item.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(item => {
    item.user = formatUser(item.user.dataValues)
    return item
  })

  return {
    count: result.count,
    blogList,
  }
}

/**
 * 根据条件更新数据
 * @param {Object} param0 要更新的内容 { newIsRead, }
 * @param {Object} param1 条件 { userId, isRead, }
 */
async function updateAtRelation({ newIsRead, }, { userId, isRead, }) {
  const updateData = {}
  newIsRead && (updateData.isRead = newIsRead)

  const whereOpt = {
    userId,
  }
  isRead && (whereOpt.isRead = isRead)

  const result = await AtRelation.update(updateData, {
    where: whereOpt,
  })

  return result[0] > 0
}

module.exports = {
  createAtRelation,
  getRelationCount,
  getAtUserBlogList,
  updateAtRelation,
}
