<template>
	<view v-if="address">
		<lee-address-form :defaults="address" @submit="submitHandler">
			<button class="btn" type="warn" @click="removeAddress">删除</button>
		</lee-address-form>
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
			},
			
			// 删除地址
			removeAddress() {

				const next = async () => {
					uni.showLoading({ title: '正在删除' })
					const { data: res } = await this.$http.post('/address/remove', {
						_id: this.address._id
					})
					uni.hideLoading()
					if (res.status !== 'ok') {
						uni.showToast({
							icon: 'none',
							title: res.errmsg
						})
						return
					}
					uni.navigateBack()
					this.$store.dispatch('getAddress')
				}
				
				uni.showModal({
					title: '删除提示',
					content: '确定删除此地址吗？',
					success: ({ confirm }) => {
						if (confirm) {
							next()
						}
					},
				})
			}
		}
	}
</script>

<style lang="scss">
	.btn {
		margin: $spacing-base;
	}
</style>
