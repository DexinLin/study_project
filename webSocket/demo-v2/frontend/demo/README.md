### webSocket 原理 demo

### 聊天室

    - 前端

    1、Login
        用户名输入 / 进入聊天室按钮
        input username(6) -> localstorage -> enter the chatting room
    2、Home
        列表 / 消息输入框 / 发送按钮
        localstorage -> username / message / id / 消息时间 -> 后端socket服务

    open
    close
    error
    message 接收广播来的数据

    - 后端

        接收 -> 消息数据 -> 广播给所有连接到socket服务的客户端

    open
    close
    error
    connection
        message 接收客户端发送的消息数据 -> 广播





### 如何检测和关闭断开的连接？
<!-- 有时，服务器和客户端之间的链接可能会以某种方式中断，使服务器和客户端都不知道连接的断开状态（例如，在拉线时）。

在这些情况下，ping 消息可用作验证远程端点是否仍在响应的一种手段。

import { WebSocketServer } from 'ws';

function heartbeat() {
  this.isAlive = true;
}

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', function close() {
  clearInterval(interval);
});
Pong 消息会根据规范的要求自动发送以响应 ping 消息。

就像上面的服务器示例一样，您的客户端也可能在不知情的情况下失去连接​​。您可能希望在客户端上添加一个 ping 侦听器以防止这种情况发生。一个简单的实现是：

import WebSocket from 'ws';

function heartbeat() {
  clearTimeout(this.pingTimeout);

  // Use `WebSocket#terminate()`, which immediately destroys the connection,
  // instead of `WebSocket#close()`, which waits for the close timer.
  // Delay should be equal to the interval at which your server
  // sends out pings plus a conservative assumption of the latency.
  this.pingTimeout = setTimeout(() => {
    this.terminate();
  }, 30000 + 1000);
}

const client = new WebSocket('wss://echo.websocket.org/');

client.on('open', heartbeat);
client.on('ping', heartbeat);
client.on('close', function clear() {
  clearTimeout(this.pingTimeout);
}); -->