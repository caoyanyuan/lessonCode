const http = require('http')
const context = require("./context"); 
const request = require("./request"); 
const response = require("./response");

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
module.exports = KKB

