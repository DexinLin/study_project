<template>
  <div class="hello">
    <el-button>按钮1</el-button>
    <el-button type="primary">按钮2</el-button>
    <el-button type="success">按钮3</el-button>
    <i class="fa fa-users"></i>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
