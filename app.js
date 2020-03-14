let Koa = require('koa')
let app = new Koa()
const fs = require('fs')
const static = require('koa-static')   //静态资源服务插件
const cors = require('koa2-cors'); //跨域处理
var Router = require('koa-router');
var router = new Router();
const path = require('path')
const staticPath = './'
// 配置静态web服务的中间件
app.use(static(
    path.join(__dirname, staticPath)
))
app.use(cors({
    origin: function (ctx) { //设置允许来自指定域名请求
        // if (ctx.url === '/test') {
        return '*'; // 允许来自所有域名请求
        // }
        // return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
})
)
router.get('/api/bdTodayHot', async (ctx) => {
    ctx.response.type = 'json'
    ctx.response.body = fs.createReadStream('./百度今日热点.json')
})

/*启动路由*/
app.use(router.routes())
    .use(router.allowedMethods());
app.listen(3003)
console.log('server running at http://localhost:3003')