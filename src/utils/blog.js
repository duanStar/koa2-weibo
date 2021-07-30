/**
 * @description 微博数据相关工具方法
 * @author Duan Hongfei
 */

const { render, } = require('ejs')
const fs = require('fs')
const path = require('path')

// 模板文件内容
const BLOG_LIST_TPL = fs.readFileSync(path.resolve(__dirname, '../views/widgets/blog-list.ejs'), {
  encoding: 'utf-8',
}).toString()

/**
 * 根据 blogList 渲染html字符串
 * @param {Array} blogList 微博列表
 * @param {boolean} canReply 是否可回复
 */
function getBlogListStr(blogList = [], canReply = false) {
  return render(BLOG_LIST_TPL, {
    blogList,
    canReply,
  })
}

module.exports = {
  getBlogListStr,
}
