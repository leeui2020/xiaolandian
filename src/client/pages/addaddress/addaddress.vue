<template>
	<view>
		<lee-address-form @submit="submitHandler" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 点击保存按钮
			submitHandler({ detail }) {
				this.$utils.checkUser(async user => {
					const { userId } = user
					uni.showLoading({ title: '正在保存' })
					const { data: res } = await this.$http.post('/address/add', Object.assign({ userId }, detail))
					uni.hideLoading()
					if (res.status !== 'ok') {
						return uni.showToast({ title: res.errmsg, icon: 'none' })
					}
					uni.showToast({ title: '保存成功' })
					this.$store.dispatch('getAddress')
					uni.navigateBack({})
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
