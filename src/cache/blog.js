/**
 * @description 微博缓存
 * @author Duan Hongfei
 */

const { get, set, } = require('./_redis')
const { getBlogListByUser, } = require('../services/blog')

// redis key 前缀
const KEY_PREFIX = 'weibo:square:'

/**
 * 获取广场列表缓存
 * @param {number} pageIndex 页码
 * @param {number} pageSize 每页大小
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
  
  // 尝试获取缓存
  const cacheResult = await get(key)
  if(cacheResult !== null) return cacheResult
  
  // 没有缓存，读取数据库
  const result = await getBlogListByUser(null, pageIndex, pageSize)

  set(key, result, 60)

  return result
}

module.exports = {
  getSquareCacheList,
}
