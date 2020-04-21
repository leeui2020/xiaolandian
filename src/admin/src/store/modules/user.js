import router from '@/router'
import { setToken, getStorage } from '@/libs/utils'

export default {
  state: {
    email: '',
    nickName: '',
    ...getStorage('userState')
  },

  actions: {

    logout(ctx) {
      setToken(null)
      ctx.commit('setState', { email: '', nickName: '' })
      router.push({ name: 'Login' })
    }
  },

  mutations: {
    setState(state, obj) {
      Object.assign(state, obj)
    }
  }
}
