<template>
	<view class="content" v-if="init">
		<view class="caption">
			<view>请使用<text class="mark">{{ detail.qrcodeTitle }}</text></view>
			<view>扫描下方二维码进行支付</view>
		</view>
		<image class="qrcode" :src="detail.qrcode" mode="widthFix"></image>
		<view class="price">{{ detail.totalFee | priceFormatter }}</view>
		<view class="tip">*付款时请备注您的单号</view>
		<view class="control">
			<view class="control-text">{{ detail.order.cornet }}</view>
			<view class="control-action" @click="copyCornet">复制</view>
		</view>
		
		<view class="tip">*请在支付后点击下方按钮</view>
		<button type="primary" @click="confirmHandler">我已支付，请检查</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				init: false,
				detail: null
			}
		},
		filters: {
			// 格式化价格
			priceFormatter(v) {
				return `￥${v / 100}`
			}
		},
		async created() {
			const { query } = this.$route
			await this.getPaymentData(query.order, query.action)
		},
		methods: {
			async getPaymentData(orderId, paycodeId) {
				if (!orderId || !paycodeId) return
				uni.showLoading({ title: '正在加载' })
				const { data: res } = await this.$http.post('/order/getPaymentData', {
					orderId,
					paycodeId
				})
				uni.hideLoading()
				if (res.status !== 'ok') {
					uni.showToast({ icon: 'none', title: res.errmsg })
					return
				}
				
				this.detail = res.data
				this.init = true
			},
			
			// 点击检查按钮
			confirmHandler() {
				if (this.submited) return
				uni.showModal({
					title: '提示',
					content: '你是否已经完成支付？',
					success: async ({ confirm }) => {
						if (!confirm) return
						uni.showLoading({ title: '正在加载' })
						const { data: res } = await this.$http.post('/order/payFinish', {
							_id: this.detail.order._id,
							paycodeId: this.detail.paycode._id
						})
						uni.hideLoading()
						if (res.status !== 'ok') {
							uni.showToast({ icon: 'none', title: res.errmsg })
							return
						}
						uni.showModal({
							title: '付款成功',
							content: '客服审核后将在第一时间发货，祝您购物愉快！',
							showCancel: false,
							success: () => {
								this.submited = true
								// uni.navigateBack()
								uni.redirectTo({
									url: '/pages/order-list/order-list?index=1'
								})
							}
						})
					}
				})
			},
			
			// 复制单号
			copyCornet() {
				uni.setClipboardData({
					data: this.detail.order.cornet,
					success() {
						uni.showToast({ title: '复制成功' })
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		height: 100%;
		padding: $spacing-xl $spacing-base;
		padding-top: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		> .caption {
			font-weight: 600;
			margin-bottom: $spacing-lg;
			
			.mark {
				font-size: $text-lg;
				color: $uni-color-error;
			}
		}
		
		> .qrcode {
			$size: 300rpx;
			width: $size;
			height: $size;
			background-color: $uni-bg-color-mask;
			margin-bottom: $spacing-xl;
		}
		
		> .price {
			font-size: $text-xl;
			font-size: 900;
			margin-bottom: $spacing-xl;
		}
		
		> .tip {
			font-size: $text-sm;
			color: $uni-color-error;
			margin-bottom: $spacing-base;
		}
		
		> button {
			width: 100%;
			font-size: $text-base;
		}
		
	}
	
	.control {
		$height: 80rpx;
		height: $height;
		background-color: $uni-bg-color;
		border-radius: 10rpx;
		margin-bottom: $spacing-base;
		display: flex;
		align-items: center;
		width: 100%;
		
		&-text {
			flex: 1;
			width: 0;
			text-align: center;
		}
		
		&-action {
			padding: 0 $spacing-base;
			color: $uni-color-primary;
		}
	}
</style>
