/**
 * @description 个人主页 controller
 * @author Duan Hongfei
 */

const { PAGE_SIZE, } = require('../conf/constant')
const { addFollowerFailInfo, deleteFollowerFailInfo, } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel, } = require('../model/ResModel')
const { getBlogListByUser, } = require('../services/blog')
const { addFollower, removeFollower, } = require('../services/userRelation')

/**
 * 获取微博列表
 * @param {string} userName 用户名
 * @param {number} pageIndex 页数
 */
async function getProfileBlogList(userName, pageIndex = 0) {
  const res = await getBlogListByUser(userName, pageIndex, PAGE_SIZE)
  const blogList = res.blogList

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    count: res.count,
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE,
  })
}

/**
 * 关注
 * @param {number} userId 关注人Id
 * @param {number} followerId 被关注人Id
 */
async function follow(userId, followerId) {
  try {
    await addFollower(userId, followerId)
    return new SuccessModel()
  }catch(err) {
    console.error(err.message, err.stack)
    return new ErrorModel(addFollowerFailInfo)
  }
}

/**
 * 取消关注
 * @param {number} userId 取消关注人Id
 * @param {number} followerId 被取消关注人Id
 */
async function unFollow(userId, followerId) {
  const res = await removeFollower(userId, followerId)
  if(!res) {
    return new ErrorModel(deleteFollowerFailInfo)
  }
  return new SuccessModel()
}


module.exports = {
  getProfileBlogList,
  follow,
  unFollow,
}
