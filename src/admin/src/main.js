import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import request from './libs/request'
import 'font-awesome/css/font-awesome.css'
import './libs/element'
import './styles/index.scss'

Vue.config.productionTip = false
Vue.prototype.$http = request

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
