<template>
	<view class="card" @click="selectHandler">
		<!-- 图标 -->
		<view class="card-icon">
			<text>{{ name | iconFormatter }}</text>
		</view>
		<!-- 内容 -->
		<view class="card-content">
			<view class="card-row">
				<text class="name">{{ name }}</text>
				<text class="phone">{{ phone }}</text>
				<text class="brand" v-if="isDefault">默认</text>
			</view>
			<view class="card-address">
				<text>{{ city | addressFormat }}</text>
				<text>{{ address }}</text>
			</view>
		</view>
		<!-- 编辑 -->
		<view class="action" v-if="!hideEdit" @click.stop="editBtnHandler">
			<uni-icons type="compose"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			name: String,
			phone: String,
			isDefault: Boolean,
			city: Array,
			address: String,
			hideEdit: {
				type: Boolean,
				default: false
			}
		},
		filters: {
			// 图标格式化
			iconFormatter(v) {
				return v[0]
			},
			
			// 格式化地址
			addressFormat(city) {
				return city.join(' ')
			}
		},
		methods: {
			// 点击地址
			selectHandler() {
				this.$emit('click');
			},
			
			// 点击编辑按钮
			editBtnHandler() {
				this.$emit('edit')
			}
		}
	}
</script>

<style lang="scss">
	$icon-size: 80upx;
	
	.card {
		padding: $spacing-base;
		background-color: $uni-bg-color;
		display: flex;
		align-items: center;
		
		&-icon {
			width: $icon-size;
			height: $icon-size;
			border-radius: 50%;
			background-color: $uni-text-color-placeholder;
			color: $uni-text-color-inverse;
			line-height: $icon-size;
			text-align: center;
			margin-right: $spacing-sm;
		}
		
		&-content {
			flex: 1;
			width: 0;
		}
		
		&-row {
			display: flex;
			align-items: flex-end;
			margin-bottom: $spacing-xs;
			
			> .name {
				font-size: $text-lg;
			}
			
			> .phone {
				font-size: $text-sm;
				color: $uni-text-color-grey;
			}
			
			> .brand {
				font-size: $text-xs;
				color: $uni-color-primary;
				background-color: lighten($uni-color-primary, 30%);
				padding: $spacing-xs $spacing-xs;
				border-radius: 8upx;
			}
			
			> text + text {
				margin-left: $spacing-sm;
			}
		}
		
		&-address {
			font-size: $text-sm;
			> text + text {
				margin-left: $spacing-sm;
			}
		}
		
		> .action {
			margin-left: $spacing-sm;
		}
	}
</style>
