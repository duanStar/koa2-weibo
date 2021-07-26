const server = require('./server')

test('json 接口测试', async () => {
  const res = await server.get('/json');
  expect(res.body).toEqual({
    title: 'koa2 json'
  })
});