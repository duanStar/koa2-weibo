/**
 * @description 首页 controller
 * @author Duan Hongfei
 */

const { ErrorModel, SuccessModel, } = require('../model/ResModel')
const { createBlog, getFollowersBlogList, } = require('../services/blog')
const { createAtRelation, } = require('../services/atRelation')
const { createBlogFailInfo, } = require('../model/ErrorInfo')
const xss = require('xss')
const { PAGE_SIZE, REG_FOR_AT_WHO, } = require('../conf/constant')
const { getUserInfo, } = require('../services/user')

/**
 * 创建微博
 * @param {string} userId 用户Id
 * @param {string} content 微博内容
 * @param {string} image 插入图片链接
 */
async function create(userId, content, image) {
  // 分析收集content中@内容
  const atUserNameList = []
  content = content.replace(REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
    atUserNameList.push(userName)
    return matchStr
  })

  // 根据 @ 用户名收集用户信息
  const atUserList = await Promise.all(atUserNameList.map(userName => getUserInfo(userName)))

  // 根据用户信息，获取用户Id
  const atUserIdList = atUserList.map(user => user.id)

  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image,
    })

    const blogId = blog.id
    // 创建 @ 关系
    await Promise.all(atUserIdList.map(userId => createAtRelation(blogId, userId)))

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
