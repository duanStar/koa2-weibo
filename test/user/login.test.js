/**
 * @description user api test
 * @author Duan Hongfei
 */

const server = require('../server')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

let COOKIE = ''

test('注册一个用户，应该成功', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).toBe(0)
})

test('重复注册，应该失败', async () => {
  const res = await server.post('/api/user/register').send(testUser)
  expect(res.body.errno).not.toBe(0)
})

test('查询注册的用户名应该存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).toBe(0)
})

test('json schema 检测，非法的数据格式，注册应该失败', async () => {
  const res = await server.post('/api/user/register').send({
    userName: '123',
    password: 'a',
    gender: 'male'
  })
  expect(res.body.errno).not.toBe(0)
})

test('登录，应该成功', async () => {
  const res = await server.post('/api/user/login').send({
    userName,
    password
  })
  expect(res.body.errno).toBe(0)

  // 获取cookie
  COOKIE = res.headers['set-cookie'].join(';')
})

test('删除用户，应该成功', async () => {
  const res = await server.post('/api/user/delete').set('Cookie', COOKIE)
  expect(res.body.errno).toBe(0)
})

test('删除之后，再次查询注册的用户名，应该不存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName })
  expect(res.body.errno).not.toBe(0)
})
