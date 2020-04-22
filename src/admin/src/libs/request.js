import axios from 'axios'
import store from '@/store'
import { getToken, setToken } from '@/libs/utils'

const instance = axios.create({})

instance.interceptors.request.use(config => {
  config.headers.token = getToken()
  return config
})

instance.interceptors.response.use(res => {
  if (res.data.token) {
    setToken(res.data.token)
  }

  // 权限验证失败
  if (res.data.errcode === 403) {
    store.dispatch('user/logout');
  }

  return res
})

export default instance
