/**
 * @description 微博 service
 * @author Duan Hongfei
 */

const { Blog, User, UserRelation, } = require('../db/model/index')
const { formatUser, formatBlog, } = require('./_format')

/**
 * 创建微博
 * @param {Object} param0 创建微博所需数据 { userId, content, image }
 */
async function createBlog({ userId, content, image, }) {
  const result = await Blog.create({
    content,
    image,
    userId,
  })
  return result.dataValues
}

/**
 * 根据用户获取微博列表
 * @param {string} userName 用户名
 * @param {number} pageIndex 页数
 * @param {number} pageSize 每页大小
 */
async function getBlogListByUser(userName, pageIndex = 0, pageSize = 10) {
  const userWhereOpts = {}
  userName && (userWhereOpts.userName = userName)

  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ['id', 'desc',],
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture',],
        where: userWhereOpts,
      },
    ],
  })

  let blogList = result.rows.map(item => item.dataValues)
  blogList = blogList.map(item => {
    const user = item.user.dataValues
    item.user = formatUser(user)
    return item
  })
  blogList = formatBlog(blogList)
  let count = result.count

  return {
    count,
    blogList,
  }
}

/**
 * 获取关注人微博列表
 * @param {number} userId 用户Id
 * @param {number} pageIndex 页数
 * @param {number} pageSize 每页大小
 */
async function getFollowersBlogList(userId, pageIndex = 0, pageSize = 10) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [
      ['id', 'desc',],
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture',],
      },
      {
        model: UserRelation,
        where: {
          userId,
        },
        attributes: ['userId', 'followerId',],
      },
    ],
  })

  let blogList = result.rows.map(item => item.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(item => {
    let user = item.user.dataValues
    user = formatUser(user)
    item.user = user
    return item
  })

  return {
    count: result.count,
    blogList,
  }
}

module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowersBlogList,
}
