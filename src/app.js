const Koa = require('koa')
const path =require('path')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')

const { REDIS_CONF, } =  require('./conf/db')
const { isProd, } = require('./utils/env')
const { SESSION_SECRET_KEY, } = require('./conf/secretKeys')

// 路由引入
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const utilsAPIRouter = require('./routes/api/utils')
const blogViewRouter = require('./routes/view/blog')
const blogAPIRouter = require('./routes/api/blog')
const errorViewRouter = require('./routes/view/error')

// error handlerc
let onerrorConf =  {}
if (isProd) {
  onerrorConf = {
    redirect: '/error',
  }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text',],
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.resolve(__dirname, '../uploadFiles')))

app.use(views(__dirname + '/views', {
  extension: 'ejs',
}))

// session配置
app.keys = SESSION_SECRET_KEY
app.use(session({
  key: 'weibo.sid', // cookie的名字,默认为'koa.sid'
  prefix: 'weibo:sess:', // redis key 的前缀，默认为'koa:sess:'
  cookie: {
    httpOnly: true,
    path: '/',
    maxAge: 24 * 60 * 60 * 1000, // ms 
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
  }),
}))

// routes
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(blogAPIRouter.routes(), blogAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
