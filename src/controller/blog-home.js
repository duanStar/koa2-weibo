/**
 * @description 首页 controller
 * @author Duan Hongfei
 */

const { ErrorModel, SuccessModel, } = require('../model/ResModel')
const { createBlog, getFollowersBlogList, } = require('../services/blog')
const { createBlogFailInfo, } = require('../model/ErrorInfo')
const xss = require('xss')
const { PAGE_SIZE, } = require('../conf/constant')

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

/**
 * 获取首页微博列表
 * @param {number} userId 用户Id
 * @param {number} pageIndex 页码
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList(userId, pageIndex, PAGE_SIZE)

  const { count, blogList, } = result

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    pageIndex,
    pageSize: PAGE_SIZE,
    count,
    blogList,
  })
}

module.exports = {
  create,
  getHomeBlogList,
}
