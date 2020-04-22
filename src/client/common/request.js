import url from 'url'
import store from '@/store'

const hostname = 'http://localhost:20203/'
export default {
	post(part, data, header = {}) {
		return new Promise((resolve, reject) => {
			if (store.state.user) {
				header.token = store.state.user.token
			}
			uni.request({
				url: url.resolve(hostname, part),
				method: 'POST',
				data: Object.assign({}, data),
				header: Object.assign({}, header),
				success(res) {
					if (res.data.token) {
						store.commit('setToken', res.data.token)
					}
					
					// 验证失败，退出登录
					if (res.data.errcode === 403) {
						store.dispatch('logout')
					}
					
					resolve(res)
				},
				fail: reject
			})
		})
	}
}
