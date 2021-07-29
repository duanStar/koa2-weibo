/**
 * @description blog model test
 * @author Duan Hongfei
 */

const { Blog } = require('../../src/db/model/index')

test('Blog 模型的各个属性应符合预期', async () => {
  const result = Blog.build({
    content: '测试内容',
    image: '/test.png',
    userId: 1
  })

  expect(result.content).toBe('测试内容')
  expect(result.image).toBe('/test.png')
  expect(result.userId).toBe(1)
})
