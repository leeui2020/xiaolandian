import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { getToken } from '@/libs/utils'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: '/admin/',
  routes
})

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (!token && !to.meta.notAuth) {
    return next({ name: 'Login' })
  }
  next()
})

export default router
