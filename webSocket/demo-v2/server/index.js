const ws = require('ws');
// 设置心跳间隔和超时
const heartbeatInterval = 30000;
const heartbeatTimeout = 3 * heartbeatInterval;
const WebSocket = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
};
let interval = null;

((ws) => {
    const server = new ws.Server({ port: 3000 });

    const init = () => {
        bindEvent();
        console.log('服务启动成功');
    };

    function bindEvent() {
        server.on('connection', handleWsConnection);
        server.on('open', handleWsOpen);
        server.on('close', handleWsClose);
        server.on('error', handleWsError);
    };

    function handleWsConnection(ws) {
        console.log("handleWsConnection 有个帅哥进来了");

        // 设置心跳检测
        interval = setInterval(ping, heartbeatInterval);

        ws.on('pong', function () {
            // 重置心跳检测的计时器
            clearInterval(interval);
            interval = setInterval(ping, heartbeatInterval);
        });

        ws.on('message', handleWsMessage);
        // ws.on('open', handleWsOpen);
        ws.on('close', handleWsClose);
        // ws.on('error', handleWsError);
    };

    function handleWsClose() {
        console.log("handleWsClose >>> 帅哥又走了 呜呜呜");
        clearInterval(interval);
        interval = null;
    };

    function handleWsOpen() {
        console.log("handleWsOpen >>>");
    }

    function handleWsError() {
        console.log("handleWsError");
    }

    function handleWsMessage(msg) {
        // ws.send("");
        let data = msg.toString('utf-8');
        // console.log('msg >>', data);
        server.clients.forEach(c => {
            c.send(data);
        })
    }

    function ping() {
        if (ws.readyState === WebSocket.OPEN) {
            ws.ping();
        }
    }
    init();
})(ws);