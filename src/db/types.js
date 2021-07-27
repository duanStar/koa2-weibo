/**
 * @description 封装sequelize数据类型
 * @author Duan Hongfei
 */

const { DataTypes, } = require('sequelize')

module.exports = {
  STRING: DataTypes.STRING,
  DECIMAL: DataTypes.DECIMAL,
  INTEGER: DataTypes.INTEGER,
  TEXT: DataTypes.TEXT,
  BOOLEAN: DataTypes.BOOLEAN,
}