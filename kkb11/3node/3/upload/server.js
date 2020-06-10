const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((request, response) => {
    const { pathname } = require('url').parse(request.url)

    if(pathname == '/upload') {
        console.log('uploading');
        const fileName = request.headers['file-name'] ? request.headers['file-name'] : 'abc.png'
        const outputFile = path.resolve(__dirname, fileName)
        const fis = fs.createWriteStream(outputFile)

        //Buffer connect
        request.on('data',data => {
            chunk.push(data)
            size += data.length
            console.log('data:',data ,size)
        })
        request.on('end',() => {
            console.log('end...')
            const buffer = Buffer.concat(chunk,size)
            size = 0
            fs.writeFileSync(outputFile,buffer)
            response.end()
        })

        // 流事件写入
        request.on('data', data => {
            console.log('data:',data)
            fis.write(data)
        })
        request.on('end', () => {
            fis.end()
            response.end()
        })
    }
})