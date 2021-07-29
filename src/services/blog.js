/**
 * @description 微博 service
 * @author Duan Hongfei
 */

const { Blog, } = require('../db/model/index')

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

module.exports = {
  createBlog,
}
