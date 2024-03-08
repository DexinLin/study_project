<template>
  <div class="login">
    <input ref="nameBox" :placeholder="placeText">
    <button class="btn" ref="btn" @click="handleUserLogin">登录</button>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        placeText: '请输入用户名称'
      }
    },
    methods: {
      handleUserLogin() {
        let value = this.$refs.nameBox.value;
        
        if (!value.trim())
        {
          console.log("请输入用户名称")
          return;
        }

        if (value.trim().length < 6)
        {
          alert('需要输入最少6个字符');
          return;
        }

        console.log("用户点击了登录按钮", value);
        localStorage.setItem("username", value);
        this.$router.push('/');
        return;
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
