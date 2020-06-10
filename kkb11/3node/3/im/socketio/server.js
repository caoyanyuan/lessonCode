var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/index.html')
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('chat message:' + msg);
        
        //广播给所有人
        io.emit('chat message', msg)
        //广播除了发送者外所有人
        //socket.broadcast.emit('chat messgae', msg)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

http.listen(3000)