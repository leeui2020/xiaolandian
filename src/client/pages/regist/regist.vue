<template>
	<view>
		<uni-list>
			<uni-list-item title="邮箱" :showArrow="false">
				<input
					type="text"
					slot="right"
					placeholder="请使用QQ邮箱"
					class="input-control"
					v-model="email"
				>
			</uni-list-item>
			<uni-list-item title="密码" :showArrow="false">
				<input
					type="password"
					slot="right"
					placeholder="设置登录密码"
					class="input-control"
					v-model="password"
				>
			</uni-list-item>
			<uni-list-item title="确认密码" :showArrow="false">
				<input
					type="password"
					slot="right"
					placeholder="确认登录密码"
					class="input-control"
					v-model="repassword"
				>
			</uni-list-item>
			<uni-list-item title="验证码" :showArrow="false">
				<view class="flex" slot="right">
					<input
						type="text"
						class="input-control"
						placeholder="邮箱验证码"
						v-model="code"
					>
					<button size="mini" @click="codeButtonHandler">发送验证码</button>
				</view>
			</uni-list-item>
		</uni-list>
		
		<view class="options">
			<button type="primary" @click="registBtnHandler">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				password: '',
				repassword: '',
				code: ''
			}
		},
		methods: {
			// 发送验证码
			async sendCode(type, email) {
				uni.showLoading({ title: '正在发送' })
				const { data: res } = await this.$http.post('/code/send', {
					type,
					email
				})
				uni.hideLoading()
				if (res.status !== 'ok') {
					uni.showToast({
						icon: 'none',
						title: res.errmsg
					})
					return
				}
				uni.showToast({ title: '验证码已发送' })
			},
			
			// 发送验证码按钮点击
			codeButtonHandler() {
				if (!this.email) {
					uni.showToast({
						icon: 'none',
						title: '请输入邮箱',
					})
					return
				}
					
				if (!this.$utils.checkEmail(this.email)) {
					uni.showToast({
						icon: 'none',
						title: '请使用QQ邮箱',
					})
					return
				}
				this.sendCode('注册', this.email)
			},
			
			// 点击注册按钮
			async registBtnHandler() {
				const { email, password, repassword, code } = this
				const showErr = title => uni.showToast({
					title,
					icon: 'none'
				})
				if (!email) return showErr('请填写邮箱')
				if (!this.$utils.checkEmail(email)) return showErr('请使用QQ邮箱')
				if (!password) return showErr('请填写密码')
				if (password.length < 6) return showErr('密码不安全')
				if (repassword !== password) return showErr('确认密码不匹配')
				if (!code || code.length !== 6) return showErr('验证码错误')
				
				uni.showLoading({ title: '正在注册' })
				const { data: res } = await this.$http.post('/user/regist', {
					email,
					password,
					code
				})
				uni.hideLoading()
				if (res.status !== 'ok') {
					return showErr(res.errmsg)
				}
				uni.showToast({ title: '注册成功' })
				uni.navigateBack({})
			}
		}
	}
</script>

<style lang="scss">
	.input-control {
		text-align: right;
		display: inline-block;
	}
	
	.flex {
		display: flex;
		align-items: center;
		width: 400upx;
		
		> .input-control {
			flex: 1;
			width: 0;
		}
		
		> button {
			display: inline-block;
			margin-left: $spacing-sm;
		}
	}
	
	.options {
		padding: $spacing-xl $spacing-base;
	}
</style>
