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
					resolve(res)
				},
				fail: reject
			})
		})
	}
}
