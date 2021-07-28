/**
 * @description utils controller
 * @author Duan Hongfei
 */

const fse = require('fs-extra')
const { uploadFileSizeFailInfo, } = require('../model/ErrorInfo')
const { ErrorModel, SuccessModel, } = require('../model/ResModel')
const { MAX_SIZE, DIST_FOLDER_PATH, } = require('../conf/constant')
const path = require('path')

fse.pathExists(DIST_FOLDER_PATH).then(async exist => {
  if(!exist) {
    await fse.ensureDir(DIST_FOLDER_PATH)
  }
})

/**
 * 保存上传的文件
 * @param {string} name 文件名称 
 * @param {string} size 文件大小 
 * @param {string} type 文件类型 
 * @param {string} filePath 文件路径 
 */
async function saveFile({ name, size, type, filePath, }) {
  if(size > MAX_SIZE) {
    await fse.remove(filePath)
    return new ErrorModel(uploadFileSizeFailInfo)
  }
  // 移动文件
  const fileName = Date.now() + '.' + name
  const distFilePath = path.resolve(DIST_FOLDER_PATH, fileName)
  await fse.move(filePath, distFilePath)

  return new SuccessModel({
    url: `/${fileName}`,
  })
}

module.exports = {
  saveFile,
}
