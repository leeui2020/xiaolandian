<template>
	<view class="lee-search" :style="{ height }">
		<view class="lee-search-icon">
			<uni-icons type="search"></uni-icons>
		</view>
		<input class="lee-search-input" type="text" :placeholder="placeholder" :disabled="disabled">
	</view>
</template>

<script>
	export default {
		props: {
			height: {
				type: String,
				default: '100%'
			},
			placeholder: {
				type: String,
				default: ''
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	.lee-search {
		border-radius: 10upx;
		background-color: $uni-bg-color-grey;
		display: flex;
		align-items: center;
		position: relative;
		
		&-icon {
			height: 100%;
			display: flex;
			align-items: center;
			padding: 0 $spacing-sm;
			color: $uni-text-color-grey;
		}
		
		&-input {
			flex: 1;
			width: 0;
		}
	}
</style>
