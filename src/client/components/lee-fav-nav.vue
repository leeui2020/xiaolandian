<template>
	<view class="lee-fav-nav">
		<button>
			<uni-icons type="cart" color="#fff" :size="26"></uni-icons>
			<uni-badge :text="cartCount + ''" type="error" v-show="cartCount"></uni-badge>
		</button>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters(['cartCount'])
		}
	}
</script>

<style lang="scss">
	$button-size: 100upx;
	
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
