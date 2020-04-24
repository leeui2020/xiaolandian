import qs from 'querystring'
import store from '@/store/index.js'
import request from '@/common/request.js'

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

// 选择支付方式并跳转到支付页面
export async function gotoPayment(_id) {
	uni.showLoading({ title: '加载中' })
	const { data: res } = await request.post('/paycode/canUse')
	uni.hideLoading()
	if (res.status !== 'ok') {
		uni.showToast({ icon: 'none', title: res.errmsg })
		return
	}
	
	const resultHandler = payItem => {
		uni.navigateTo({
			url: `/pages/payment/payment?action=${payItem._id}&order=${_id}`
		})
	}
	
	if (res.data.length === 1) {
		resultHandler(res.data[0])
	} else {
		uni.showActionSheet({
			itemList: res.data.map(v => v.title),
			success({ tapIndex }) {
				resultHandler(res.data[tapIndex])
			}
		})
	}
}