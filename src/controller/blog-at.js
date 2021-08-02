/**
 * @description 微博 @ 用户关系 controller
 * @author Duan Hongfei
 */

const { getRelationCount, getAtUserBlogList, } = require('../services/atRelation')
const { SuccessModel, } = require('../model/ResModel')
const { PAGE_SIZE, } = require('../conf/constant')

/**
 * 获取 @ 我的微博数量
 * @param {number} userId 用户 Id
 */
async function getAtMeCount(userId) {
  const atCount = await getRelationCount(userId)

  return new SuccessModel({ atCount, })
}

/**
 * 获取 @ me微博列表
 * @param {number} userId 用户 Id
 * @param {number} pageIndex 页码
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  const result = await getAtUserBlogList(userId, pageIndex, PAGE_SIZE)
  let {  count, blogList, } = result

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    count,
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE,
  })
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
}
