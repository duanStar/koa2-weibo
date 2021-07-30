/**
 * @description 个人主页 controller
 * @author Duan Hongfei
 */

const { PAGE_SIZE, } = require('../conf/constant')
const { SuccessModel, } = require('../model/ResModel')
const { getBlogListByUser, } = require('../services/blog')
const { getUserInfo, } = require('../services/user')
const { registerUserNameNotExistInfo, } = require('../model/ErrorInfo')

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

module.exports = {
  getProfileBlogList,
}
