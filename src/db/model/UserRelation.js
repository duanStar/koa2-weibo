/**
 * @description 关注 数据模型
 * @author Duan Hongfei
 */

const seq = require('../seq')
const { INTEGER, } = require('../types')

const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户Id',
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户Id',
  },
})

module.exports = UserRelation
