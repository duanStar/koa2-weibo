/**
 * @description 用户数据模型
 * @author Duan Hongfei
 */

const seq = require('../seq')
const { STRING, DECIMAL, INTEGER, } = require('../types')

const User = seq.define('User', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名 唯一',
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码',
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称',
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    comment: '性别(1=>女性，2=>男性，3=>保密)',
    defaultValue: 3,
  },
  picture: {
    type: STRING,
    comment: '头像',
  },
  city: {
    type: STRING,
    comment: '城市',
  },
})


module.exports = User
