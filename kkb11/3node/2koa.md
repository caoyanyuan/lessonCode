#### 一、 基本使用

1.  创建一个服务

```
const Koa = require('koa')
const app = new Koa()

app.use((ctx, next) => {
    ctx.body = [
        { name: 'tom' }
    ]
    next()
})
app.use((ctx, next) => {
    console.log('url' + ctx.url) 
    if (ctx.url === '/html') { 
        ctx.type = 'text/html;charset=utf-8'
        ctx.body = `<b>我的名字是:${ctx.body[0].name}</b>` 
    }
    next()
})

app.listen(3000)

```

2. 常见的中间件操作

   1. 静态服务

      ```
      app.use(require('koa-static')(__dirname + '/'))
      ```

   2. 路由

      ```js
      const router = require('koa-router')() 
      router.get('/string', async (ctx, next) => { 
        ctx.body = 'koa2 string' 
      })
      router.get('/json', async (ctx, next) => { 
        ctx.body = { title: 'koa2 json' } 
      })
      app.use(router.routes())
      ```

      

   3. 日志
      

      ```js
      app.use(async (ctx,next) => { 
      	const start = new Date().getTime() 
      	console.log(`start: ${ctx.url}`); 
      	await next(); 
      	const end = new Date().getTime() 
      	console.log(`请求${ctx.url}, 耗时${parseInt(end-start)}ms`) 
      })
      ```

#### 二、koa原理

1. 简单化 流程化 模块化 实现回调部分

   ```js
   onst http = require('http')
   
   class KKB {
       listen(...args) {
           const server = http.createServer((req, res) => {
               this.callback(req, res)
           })
           server.listen(...args)
       }
       use(callback) {
           this.callback = callback
       }
   }
   module.exports = KKB
   
   //调用
   const KKB = require("./kkb")
   const app = new KKB()
   
   app.use((req, res) => {
       res.writeHead(200)
       res.end('hi')
   })
   
   app.listen(3000, () => {
       console.log('listen 3000')
   })
   ```

2. context 

   koa为了能够简化API，引入上下文context概念，

   将原始请求对象req和响应对象res封装并挂载到context上，

   并且在context上设置getter和setter，从而简化操作。

   context.js

   ```js
   module.exports = {
       get url() {
           return this.request.url
       },
       get body() {
           return this.response.body
       },
       set body(val) {
           this.reponse.body = val
       },
       get method() {
           return this.request.method
       }
   }
   ```

   Kkb.js

   ```js
   class KKB {
       listen(...args) {
           const server = http.createServer((req, res) => {
               //创建上下文
               let ctx = this.createContext(req, res)
   
               this.callback(ctx)
           })
           server.listen(...args)
       }
       use(callback) {
           this.callback = callback
       }
       //构建上下文
       createContext(req, res) {
           const ctx = Object.create(context)
           ctx.request = Object.create(request)
           ctx.response = Object.create(response)
   
           ctx.req = ctx.request.req = req
           ctx.res = ctx.response.res = res
   
           return ctx
       }
   }
   ```

#### 二、中间件

1. koa中间件机制： Koa中间件机制就是函数组合的概念，将一组需要顺序执行的函数复合为一个函数，外层函

   数的参数实际是内层函数的返回值。**洋葱圈模型**可以形象表示这种机制，

   compose的实现

   ```js
   function compose(mws) {
       return function() {
           return dispatch(0)
           function dispatch(i) {
               let fn = mws[i]
               if(!fn) {
                   return Promise.resolve()
               }else{
                   fn(function next(){
                       return dispatch(i + 1)
                   })
               }
           }
       }
   }
   
   //redux式 旧版本
   function compose_2(mws) {
       return mws.reduceRight((a, b) => () => b(a));
   }
   
   //redux式 新版本
   function compose_3(mws) {
       return mws.reduce((a, b) => arg => a(() => b(arg)));
   };
   ```

   

