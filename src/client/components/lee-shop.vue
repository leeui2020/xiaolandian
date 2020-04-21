<template>
	<view class="lee-shop">
		<view class="lee-shop-thumbnail">
			<image :src="thumbnail"></image>
		</view>
		
		<view class="lee-shop-content">
			<view class="lee-shop-title">{{ name }}</view>
			<view class="lee-shop-footer">
				<view class="lee-shop-price">{{ price | priceFormatter }}</view>
				<view class="lee-shop-action" @click="actionHandler">
					<uni-icons type="cart" :size="12" color="#fff"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: String,
			price: Number,
			thumbnail: String
		},
		data() {
			return {
				
			}
		},
		filters: {
			// 格式化价格
			priceFormatter(v) {
				return `￥${v / 100}`
			}
		},
		methods: {
			// 加入购物车
			actionHandler() {
				this.$emit('action')
			}
		}
	}
</script>

<style lang="scss">
	@import '~@/common/scss/mixins.scss';
	
	$title-height: 80upx;
	$footer-height: 60upx;
	$action-size: 40upx;
	
	.lee-shop {
		overflow: hidden;
		border-radius: 10upx;
		background-color: $uni-bg-color;
		box-shadow: 0 0 2upx rgba(0, 0, 0, .15);
		position: relative;
		
		&-thumbnail {
			width: 100%;
			position: relative;
			padding-bottom: 70%;
			
			> image {
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				position: absolute;
			}
		}
		
		&-content {
			padding: $spacing-sm;
		}
		
		// 标题
		&-title {
			height: $title-height;
			line-height: 1.25;
			font-weight: 600;
			margin-bottom: $spacing-xs;
			@include line-cut(2);
		}
		
		&-footer {
			height: $footer-height;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
		}
		
		&-price {
			font-size: $text-lg;
			font-weight: 600;
			color: $price-color;
		}
		
		&-action {
			width: $action-size;
			height: $action-size;
			border-radius: $action-size;
			background-color: $uni-color-primary;
			display: flex;
			align-items: center;
			justify-content: center;
			
			&:active {
				transform: translate(1px, 1px);
			}
		}
	}
</style>
