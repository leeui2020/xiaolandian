<template>
	<view class="order">
		<!-- 产品信息 -->
		<view class="order-product">
			<image
				class="order-product-image"
				:src="item.productSnapShot.thumbnail"
			></image>
			<view class="order-product-info">
				<view class="order-product-title">{{ item.productSnapShot.name }}</view>
				<view class="order-product-footer">
					<view class="order-product-price">
						{{ item.productSnapShot.price | priceFormatter }}
					</view>
					<view class="order-product-count">x{{ item.count }}</view>
				</view>
			</view>
		</view>
		<!-- 产品信息END -->
		
		<view class="order-content">
			<!-- 价格信息 -->
			<div class="order-price">
				总价 {{ item.priceSum | priceFormatter }}, 实付款
				<text class="order-price-mark">{{ item.totalFee | priceFormatter }}</text>
			</div>
			<!-- 价格信息END -->
			
			<view class="order-footer">
				<view class="order-status">{{ item.status }}</view>
				<!-- 操作 -->
				<view class="order-options">
					<view
						class="order-options-item"
						v-if="item.timeClosed"
						@click="removeBtnHandler"
					>删除订单</view>
					<block v-else>
						<view
							class="order-options-item primary"
							v-if="!item.timePayed"
							@click="payBtnHandler"
						>去付款</view>
						<view
							class="order-options-item"
							v-if="!item.timePayed"
							@click="cancelBtnHandler"
						>取消订单</view>
						
						<view
							class="order-options-item primary"
							v-if="item.timeConsign"
							@click="confirmHandler"
						>确认收货</view>
					</block>
					<view class="order-options-item" v-if="item.nu" @click="gotoWuliuPage()">查看物流</view>
				</view>
				<!-- 操作END -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object
		},
		filters: {
			// 格式化价格
			priceFormatter(v) {
				return `￥${v / 100}`
			}
		},
		methods: {
			// 派发删除事件
			removeBtnHandler() {
				this.$emit('remove')
			},
			
			// 派发取消事件
			cancelBtnHandler() {
				this.$emit('cancel')
			},
			
			// 派发付款事件
			payBtnHandler() {
				this.$emit('pay')
			},
			
			// 派发确认收货事件
			confirmHandler() {
				this.$emit('confirm')
			},
			
			// 查看物流
			gotoWuliuPage() {
				uni.navigateTo({
					url: `/pages/wuliu/wuliu?nu=${this.item.nu}`
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/common/scss/mixins.scss';
	
	.order {
		border-radius: 10rpx;
		background-color: $uni-bg-color;
		box-shadow: 0 0 2rpx rgba(0, 0, 0, .15);
		overflow: hidden;
		
		&-content {
			padding: $spacing-sm;
		}
		
		&-footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
	
	// 产品信息
	.order-product {
		$height: 160rpx;
		height: $height;
		display: flex;
		background-color: #e5e5e5;
		
		&-image {
			width: $height;
			height: $height;
			margin-right: $spacing-sm;
		}
		
		&-info {
			flex: 1;
			width: 0;
			height: $height;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			box-sizing: border-box;
			padding: $spacing-xs;
		}
		
		&-title {
			@include line-cut(2);
		}
		
		&-footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
	
	.order-price {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: $text-sm;
		margin-bottom: $spacing-base;
		
		&-mark {
			font-size: $text-base;
			font-weight: 600;
			color: $price-color;
		}
	}
	
	.order-options {
		display: flex;
		align-items: center;
		font-size: $text-sm;
		
		&-item {
			$height: 60rpx;
			height: $height;
			line-height: $height;
			text-align: center;
			padding: 0 $spacing-base;
			border-radius: $height;
			border: 2rpx solid $uni-text-color-dark;
			color: $uni-text-color-dark;
			white-space: nowrap;
			
			&:not(:last-child) {
				margin-right: $spacing-sm;
			}
			
			&.primary {
				border-color: $uni-color-primary;
				color: $uni-color-primary;
			}
		}
	}
</style>
