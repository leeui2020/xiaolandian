import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import request from './common/request.js'
import * as utils from './common/utils.js'
import './js_sdk/ican-H5Api/ican-H5Api.js'

Vue.config.productionTip = false
Vue.prototype.$http = request
Vue.prototype.$store = store
Vue.prototype.$utils = utils

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
