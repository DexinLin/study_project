import Vue from 'vue'
import App from './App.vue'
import "font-awesome/css/font-awesome.min.css"
import router from "./router";
import service from "./service";
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css"
import echarts from 'echarts'
import { getToken } from "./utils/token"
import store from "./store"

// import axios from "axios";  //使用封装好的service代替
// Vue.prototype.axios = axios;
Vue.use(ElementUI);
Vue.prototype.service = service;
Vue.prototype.$echarts = echarts;
// Vue.prototype.$message = Message;
Vue.config.productionTip = false;

// 路由导航守卫
router.beforeEach((to, from, next) => {
  let token = getToken("token");
  if (!token) {
    if (to.path != "/login")
      next('/login');
    else
      next();
  }
  else {
    //TODO:判断是否过期
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
