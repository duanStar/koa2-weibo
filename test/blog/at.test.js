/**
 * @description at 关系 test
 * @author Duan Hongfei
 */

const server = require('../server')
const { Z_COOKIE, L_ID, L_COOKIE, L_USER_NAME } = require('../testUserInfo')

let BLOG_ID = ''

test('zs 创建一条微博 @ lisi，应该成功', async () => {
  const content = `单元测试自动创建的微博 @李四 - ${L_USER_NAME}`
  const res = await server.post('/api/blog/create').send({
    content
  }).set('Cookie', Z_COOKIE)

  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toEqual(content)

  BLOG_ID = res.body.data.id
})

test('获取 lisi 的 @ 微博列表， 应该有 zs 刚刚创建的微博', async () => {
  const res = await server.get('/api/atMe/loadMore/0').set('Cookie', L_COOKIE)

  const { isEmpty, blogList, count } = res.body.data
  const isHaveBlog = blogList.some(item => item.id === BLOG_ID)

  expect(res.body.errno).toBe(0)
  expect(count).toBeGreaterThan(0)
  expect(isEmpty).not.toBeTruthy()
  expect(isHaveBlog).toBeTruthy()
})
