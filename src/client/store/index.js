import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/common/request.js'
import { checkUser } from '@/common/utils.js'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		cart: [],
		user: uni.getStorageSync('user') || null,
		// 收货地址
		address: []
	},
	
	getters: {
		// 购物车件数
		cartCount(state) {
			return state.cart.reduce((sum, item) => sum + item.count, 0)
		}
	},
	
	actions: {
		async getAddress(ctx) {
			uni.showLoading({ title: '正在加载' })
			const { data: res } = await request.post('/address/list')
			uni.hideLoading()
			if (res.status === 'ok') {
				ctx.commit('updateAddress', res.data)
			}
		},
		
		// 退出登录
		async logout(ctx) {
			ctx.commit('setUser', null)
			checkUser(() => {})
		}
	},
	
	mutations: {
		addToCart(state, goods) {
			const item = state.cart.find(v => v._id === goods._id)
			if (item) {
				item.count ++
			} else {
				state.cart.push({
					_id: goods._id,
					count: 1,
					goods
				})
			}
		},
		
		setUser(state, user) {
			state.user = user
			uni.setStorageSync('user', user)
		},
		
		setToken(state, token) {
			if (state.user) {
				state.user.token = token
				uni.setStorageSync('user', state.user)
			}
		},
		
		// 设置收货地址
		updateAddress(state, list) {
			state.address = list
		}
	}
})

export default store
