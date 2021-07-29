/**
 * @description 首页 controller
 * @author Duan Hongfei
 */

const { ErrorModel, SuccessModel, } = require('../model/ResModel')
const { createBlog, } = require('../services/blog')
const { createBlogFailInfo, } = require('../model/ErrorInfo')
const xss = require('xss')

/**
 * 创建微博
 * @param {string} userId 用户Id
 * @param {string} content 微博内容
 * @param {string} image 插入图片链接
 */
async function create(userId, content, image) {
  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image,
    })
    return new SuccessModel(blog)
  }catch(err) {
    console.error(err.message, err.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create,
}
