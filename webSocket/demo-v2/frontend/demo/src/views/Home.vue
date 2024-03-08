<template>
  <div class="home">
    <p>您好~ {{ username }}</p>
    <br>
    <br>
    <br>
    <br>
    <div class="content" ref="content"></div>
    <input class="des" ref="des">
    <button ref="send" @click="handleSendMsg">发送</button>
  </div>
</template>

<script>
// 心跳间隔时间（毫秒）
const heartbeatInterval = 30000; // 30秒
// 心跳超时时间（毫秒）
const heartbeatTimeout = 3 * heartbeatInterval; // 90秒

let ws = new WebSocket('ws:localhost:3000');
// 存储上一次接收到服务器响应的时间
let lastServerResponseTime = Date.now();
// 定时发送心跳
let heartbeatTimer = null;

export default {
  name: 'Home',
  data() {
    return {
      username: ''
    }
  },
  mounted () {
    let name = localStorage.getItem("username");

    ws.addEventListener('open', this.handleWsOpen.bind(this), false);
    ws.addEventListener('close', this.handleWsClose.bind(this), false);
    ws.addEventListener('error', this.handleWsError.bind(this), false);
    ws.addEventListener('message', this.handleWsMessage.bind(this), false);

    // 定时发送心跳
    heartbeatTimer = setInterval(function() {
        console.log('ke >>> ping')
        ws.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }));
    }, heartbeatInterval);

    // 检查心跳超时
    setInterval(function() {
        if (Date.now() - lastServerResponseTime > heartbeatTimeout) {
            // 超时，关闭连接
            ws.close();
        }
    }, heartbeatInterval);

    if (!name)
    {
      this.$router.push("/login");
      return;
    }
    this.username = name;
  },
  methods: {
    handleSendMsg() {
      console.log('点击了发送事件');

      let msg = this.$refs.des.value;

      if (!msg.trim().length) {
        console.log("输入的内容为空")
        return;
      }
      ws.send(JSON.stringify({
        id: Math.floor(new Date().getTime()/1000),
        name: this.username,
        date: Math.floor(new Date().getTime()/1000),
        msg,
        type: 'message'
      }));
      this.$refs.des.value = '';
    },

    handleWsOpen(e) {
      console.log('触发了ws的open事件');
    },

    handleWsClose(e) {
      console.log("触发了ws的close事件");
      //清除定时器
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;
      console.log('Connection closed, attempting to reconnect...');
      this.reconnectWebSocket();
    },

    handleWsError(e){ console.log('触发了ws的error事件')},

    handleWsMessage(e) {
      // console.log('触发了ws的message事件')
      lastServerResponseTime = Date.now();
      let data = JSON.parse(e.data);
      let contDom = this.$refs.content;
      console.log(data);
      
      if (data.type == 'ping')
        return;
      contDom.append(this.createList(data));
    },

    reconnectWebSocket() {
      console.log("重连ws >>>")
      ws = new WebSocket('ws:localhost:3000');
    },

    createList(data) {
      let dom = document.createElement('div');

      dom.innerHTML = `
        <p>${data.name} ${new Date(data.date*1000).toLocaleString()}</p>
        <p>消息：${data.msg}</p>
      `

      return dom;
    }
  }
}
</script>
