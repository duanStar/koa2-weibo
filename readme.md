# 基于Koa2、MySQl、Redis、Jest的简化微博

### 启动

```js
npm run dev
```

### 测试

```js
npm run test
```

### 项目技术栈

- koa-generator生成初始项目
- Koa2及Koa相关插件，如：koa-static, koa-views, koa-onerror, koa-json, koa-logger
- 利用koa-generic-session、koa-redis**将session缓存在Redis中**
- 利用redis操作Redis**缓存公共信息**
- 利用Sequelize、mysql2操作**数据库**
- 利用JSON Schema、Ajv完成**数据模型检测**
- 利用Jest、supertest完成**项目接口测试**
- 通过eslint进行**代码规范约束**
- 通过pre-commit完成项目每次git提交前进行项目代码规范检测
- travis 发布

