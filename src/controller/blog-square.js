/**
 * @description 广场 controller
 * @author Duan Hongfei
 */

const { getSquareCacheList, } = require('../cache/blog')
const { PAGE_SIZE, } = require('../conf/constant')
const { SuccessModel, } = require('../model/ResModel')

/**
 * 获取广场微博列表
 * @param {number}} pageIndex 页码
 */
async function getSquareBlogList(pageIndex = 0) {
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
  const blogList = result.blogList

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    count: result.count,
    blogList,
    pageIndex,
    pageSize: PAGE_SIZE,
  })
}

module.exports = {
  getSquareBlogList,
}
