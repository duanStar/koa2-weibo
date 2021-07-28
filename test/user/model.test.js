/**
 * @description user model test
 * @author Duan Hongfei
 */

const { User } = require('../../src/db/model/index')

test('User 模型的各个属性符合预期', async () => {
  const user = User.build({
    userName: '张三',
    password: '123',
    picture: 'xxx.png',
    city: '北京',
    nickName: 'zhangsan'
  })
  expect(user.userName).toBe('张三')
  expect(user.nickName).toBe('zhangsan')
  expect(user.password).toBe('123')
  expect(user.picture).toBe('xxx.png')
  expect(user.city).toBe('北京')
  expect(user.gender).toBe(3)
})
