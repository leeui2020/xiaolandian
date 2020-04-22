import qs from 'querystring'
import store from '@/store/index.js'

// 检查登录
export function checkUser(fn) {
	if (store.state.user) {
		fn(store.state.user)
	} else {
		const currentPages = getCurrentPages()
		const currentPage = currentPages[currentPages.length - 1]
		const _from = encodeURI([
			currentPage.route,
			qs.stringify(currentPage.$route.query)
		].join('?'))
		uni.redirectTo({
			url: `/pages/login/login?from=${_from}`
		})
	}
}

// 验证邮箱
export function checkEmail(email) {
	return /^[a-zA-Z0-9_-]+@qq(\.[a-zA-Z0-9_-]+)+$/.test(email)
}

// 验证手机号码
export function checkPhone(phone) {
	return /^1[3456789]\d{9}$/.test(phone)
}