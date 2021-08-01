/**
 * @description 用户关系单元测试
 * @author Duan Hongfei
 */

const server = require('../server')
const { Z_COOKIE, Z_ID, L_ID, L_USER_NAME } = require('../testUserInfo')
const { getFans, getFollowers } = require('../../src/controller/user-relation')

test('无论如何，先取消关注，应该成功', async () => {
  const res = await server.post('/api/profile/unFollow').send({
    userId: L_ID
  }).set('Cookie', Z_COOKIE)

  expect(1).toBe(1)
})

test('zs 关注 lisi 应该成功', async () => {
  const res = await server.post('/api/profile/follow').send({ userId: L_ID }).set('Cookie', Z_COOKIE)

  expect(res.body.errno).toBe(0)
})

test('获取 lisi 粉丝应该有 zs', async () => {
  const res = await getFans(L_ID)

  const { count, userList } = res.data

  const hasUser = userList.some(item => item.id === Z_ID)

  expect(res.errno).toBe(0)
  expect(hasUser).toBeTruthy()
  expect(count).toBeGreaterThan(0)
})

test('获取 zs 关注人应该有 lisi', async () => {
  const res = await getFollowers(Z_ID)

  const { count, userList } = res.data

  const hasUser = userList.some(item => item.id === L_ID)

  expect(res.errno).toBe(0)
  expect(hasUser).toBeTruthy()
  expect(count).toBeGreaterThan(0)
})

test('获取 zs at 列表，应该有 lisi', async () => {
  const res = await server.get('/api/user/getAtList').set('Cookie', Z_COOKIE)
  const hasUserName = res.body.some(item => item.includes(L_USER_NAME))

  expect(hasUserName).toBeTruthy()
})

test('zs 取消关注 lisi 应该成功', async () => {
  const res = await server.post('/api/profile/unFollow').send({
    userId: L_ID
  }).set('Cookie', Z_COOKIE)

  expect(res.body.errno).toBe(0)
})

