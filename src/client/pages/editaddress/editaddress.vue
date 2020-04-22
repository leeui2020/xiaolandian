<template>
	<view v-if="address">
		<lee-address-form :defaults="address" @submit="submitHandler" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				address: null
			}
		},
		async created() {
			await this.getAddressDetail(this.$route.query._id)
		},
		methods: {
			// 获取地址详情
			async getAddressDetail(_id) {
				if (!_id) return
				uni.showLoading({ title: '正在加载' })
				const { data: res } = await this.$http.post('/address/detail', { _id })
				uni.hideLoading()
				if (res.status === 'ok') {
					this.address = res.data
				}
			},
			
			// 点击了提交按钮
			submitHandler({ detail }) {
				this.$utils.checkUser(async user => {
					uni.showLoading({ title: '正在保存' })
					const { data: res } = await this.$http.post('/address/edit', {
						_id: this.$route.query._id,
						modify: detail
					})
					uni.hideLoading()
					if (res.status !== 'ok') {
						uni.showToast({ icon: 'none', title: res.errmsg })
						return
					}
					uni.showToast({ title: '保存成功' })
					uni.navigateBack()
					this.$store.dispatch('getAddress')
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
