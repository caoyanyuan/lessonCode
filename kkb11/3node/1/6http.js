const http = require('http');
const fs = require('fs')

const server = http.createServer((request, response) => {
    const { url, method } = request

    if(url == '/' && method == 'GET') {
        fs.readFile('index.html', (err, data) => {
            if(err) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain;charset=utf-8'
                })
                response.end('500，服务器错误')
            }
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html')
            response.end(data)
        })
    }else{
        response.statusCode = 404; 
        response.setHeader('Content-Type', 'text/plain;charset=utf-8'); 
        response.end('404, 页面没有找到');
    }
})
server.listen(3000)
