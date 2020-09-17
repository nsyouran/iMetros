import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import cloudbase from "@cloudbase/js-sdk";

const __init = async function(){
  const app = await cloudbase.init({
    env: "imetro-s8ara"
  })

  await app.auth({
    persistence: "session"
  }).anonymousAuthProvider().signIn().then(() => {
    // 登录成功
    console.log("登录成功")
  }).catch((err) => {
    // 登录失败
    alert(" 微信登录失败")
  });

  Vue.prototype.$cloud = app
  
}()

const jlyw = axios.create({
  baseURL: "/jlyw",
  headers: {'Content-Type': 'application/json'}
})
Vue.prototype.$jlyw = jlyw

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
