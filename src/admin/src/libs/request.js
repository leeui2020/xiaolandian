import axios from 'axios'
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

  return res
})

export default instance
