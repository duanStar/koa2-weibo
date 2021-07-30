/**
 * @description 微博 service
 * @author Duan Hongfei
 */

const { Blog, User, } = require('../db/model/index')
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

module.exports = {
  createBlog,
  getBlogListByUser,
}
