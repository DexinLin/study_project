const app = require('express')();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const path = require('path');
const io = new Server(server);

app.get("/", (req, res) => {
    console.log("进入了 请求访问")
    res.sendFile(path.join(__dirname, "index.html"));
});

io.on('connection', (socket) => {
    console.log("有个帅哥进入了聊天室");

    //监听 客户端发送的 chat message 事件
    socket.on('chat message', (msg) => {
        console.log('message >>>', msg);
        io.emit('chat message', msg); // 向客户端分发 chat message 事件
    });
    socket.on('disconnect', () => {
        console.log("帅哥又离开了聊天室 呜呜呜");
    });
});

server.listen(3030, () => {
    console.log('服务器已启动');
})