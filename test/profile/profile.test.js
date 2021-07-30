/**
 * @description 个人主页 test
 * @author Duan Hongfei
 */

const server = require('../server')
const { COOKIE, userName } = require('../testUserInfo')

test('个人主页，加载第一页数据应该成功', async () => {
  const res = await server.get(`/api/profile/loadMore/${userName}/0`).set('Cookie', COOKIE)

  expect(res.body.errno).toBe(0)

  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('count')
})
