/**
 * @description 首页 test
 * @author Duan Hongfei
 */

const server = require('../server')
const { COOKIE } = require('../testUserInfo')

let BLOG_ID = ''

test('创建微博，应该成功', async () => {
  const content = '单元测试自动创建微博_' + Date.now()
  const image = '/xxxx.png'

  const res = await server.post('/api/blog/create').send({
    content,
    image
  }).set('Cookie', COOKIE)

  expect(res.body.errno).toBe(0)
  expect(res.body.data.content).toBe(content)
  expect(res.body.data.image).toBe(image)

  BLOG_ID = res.body.data.id
})
