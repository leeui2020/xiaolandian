import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import menu from '@/menu'
import moment from 'moment'

const modules = {}
const files = require.context('./modules', false, /\.js$/)
files.keys().forEach(key => {
  const name = key.match(/\.\/(\S+)\.js/)[1]
  const part = files(key).default
  part.namespaced = true
  modules[_.camelCase(name)] = part
})

Vue.use(Vuex)
export default new Vuex.Store({
  modules,
  state: {
    menu
  }
})