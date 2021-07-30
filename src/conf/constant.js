/**
 * @description 常量
 * @author Duan Hongfei
 */

const path = require('path')

module.exports = {
  DEFAULT_PICTURE: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=550723927,1346838877&fm=27&gp=0.jpg',
  MAX_SIZE: 1024 * 1024 * 1024, // 文件最大体积 1M
  DIST_FOLDER_PATH: path.resolve(__dirname, '../../uploadFiles'),
  PAGE_SIZE: 5,
  // 正则表达式，匹配 '@昵称 - userName'
  REG_FOR_AT_WHO: /@(.+?)\s-\s(\w+?)\b/g,
}
