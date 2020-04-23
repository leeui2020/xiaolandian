<template>
	<view class="lee-fav-nav">
		<button @click="gotoOrderCenterPage">
			<uni-icons type="list" color="#fff" :size="20"></uni-icons>
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 跳转到订单中心页
			gotoOrderCenterPage() {
				uni.navigateTo({
					url: '/pages/order-list/order-list'
				})
			}
		}
	}
</script>

<style lang="scss">
	$button-size: 80rpx;
	
	.lee-fav-nav {
		right: $spacing-base;
		bottom: $spacing-base;
		position: fixed;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		
		> button {
			width: $button-size;
			height: $button-size;
			line-height: $button-size;
			border-radius: 50%;
			box-shadow: 0 0 2upx rgba(0, 0, 0, .15);
			background-color: $uni-color-primary;
			color: $uni-text-color-inverse;
			text-align: center;
			padding: 0;
			position: relative;
			overflow: visible;
			
			&::after {
				display: none;
			}
			
			&:active {
				transform: translate(1px, 1px);
			}
			
			+ button {
				margin-top: $spacing-sm;
			}
			
			> .uni-badge {
				top: 0;
				right: 0;
				position: absolute;
				transform: translate(10upx, -10upx);
			}
		}
	}
</style>
