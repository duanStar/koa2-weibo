/**
 * @description 首页 test
 * @author Duan Hongfei
 */

const server = require('../server')
const { Z_COOKIE } = require('../testUserInfo')

let BLOG_ID = ''

test('创建微博，应该成功', async () => {
  const content = '单元测试自动创建微博_' + Date.now()
  const image = '/xxxx.png'

  const res = await server.post('/api/blog/create').send({
    content,
    image
  }).set('Cookie', Z_COOKIE)

  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)

  BLOG_ID = res.body.data.id
})

test('加载首页微博数据，应该成功', async () => {
  const res = await server.get(`/api/blog/loadMore/0`).set('Cookie', Z_COOKIE)

  expect(res.body.errno).toBe(0)

  const data = res.body.data
  expect(data).toHaveProperty('isEmpty')
  expect(data).toHaveProperty('blogList')
  expect(data).toHaveProperty('pageIndex')
  expect(data).toHaveProperty('pageSize')
  expect(data).toHaveProperty('count')
})
