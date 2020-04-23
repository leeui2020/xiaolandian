<template>
	<view>
		<uni-list>
			<uni-list-item title="邮箱" :showArrow="false">
				<input class="input-control"
					type="text"
					slot="right"
					placeholder="请填写邮箱"
					v-model="email"
				>
			</uni-list-item>	
			<uni-list-item title="密码" :showArrow="false">
				<input class="input-control"
					type="password"
					slot="right"
					placeholder="请填写密码"
					v-model="password"
				>
			</uni-list-item>
		</uni-list>
		<!-- 操作 -->
		<view class="options">
			<button type="primary" @click="loginBtnHandler">登录</button>
			<button type="warn" @click="gotoRegistPage">注册</button>
			<button type="default" @click="youkeLogin">游客登录</button>
		</view>
		<!-- 操作END -->
	</view>
</template>

<script>
	export default {
		data() {
			return Object.assign({
				email: '',
				password: ''
			}, uni.getStorageSync('lastLogin'))
		},
		methods: {
			// 切换到注册页面
			gotoRegistPage() {
				uni.navigateTo({
					url: '/pages/regist/regist'
				})
			},
			
			// 点击登录按钮
			async loginBtnHandler() {
				const { email, password } = this
				const showErr = title => uni.showToast({
					title,
					icon: 'none',
				})
				
				if (!email) return showErr('请填写邮箱')
				if (!this.$utils.checkEmail(email)) return showErr('请使用QQ邮箱')
				if (!password) return showErr('请填写密码')
				
				uni.showLoading({ title: '正在登录' })
				const { data: res } = await this.$http.post('/user/login', {
					email,
					password
				})
				uni.hideLoading()
				if (res.status !== 'ok') {
					return showErr(res.errmsg)
				}
				uni.showToast({ title: '登录成功' })
				this.loginSuccess(res.data)
			},
			
			// 游客登录
			async youkeLogin() {
				uni.showLoading({ title: '正在登录' })
				const { data: res } = await this.$http.post('/user/youkeLogin')
				uni.hideLoading()
				if (res.status !== 'ok') {
					uni.showToast({ icon: 'none', title: res.errmsg })
					return
				}
				uni.showToast({ title: '登录成功' })
				this.loginSuccess(res.data)
			},
			
			loginSuccess(user) {
				this.$store.commit('setUser', user)
				const url = this.$route.query.from
					? decodeURI(this.$route.query.from) : 'pages/index/index'
				uni.redirectTo({ url: '/' + url })
				uni.setStorageSync('lastLogin', {
					email: this.email,
					password: this.password
				})
			}
		}
	}
</script>

<style lang="scss">
	.input-control {
		text-align: right;
	}
	
	.options {
		padding: $spacing-xl $spacing-base;
		
		> button + button {
			margin-top: $spacing-base;
		}
	}
</style>
