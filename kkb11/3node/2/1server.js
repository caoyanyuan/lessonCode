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
