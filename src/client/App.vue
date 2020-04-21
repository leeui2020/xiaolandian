<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	page {
		font-size: $text-base;
		background-color: $uni-bg-color-grey;
	}
	
	// popup
	.popup-content {
		padding: $spacing-lg $spacing-base;
		background-color: $uni-bg-color;
		border-radius: 10upx 10upx 0 0;
		
		> .caption {
			font-weight: 600;
			padding-bottom: $spacing-sm;
			margin-bottom: $spacing-sm;
			position: relative;
			
			&::after {
				content: '';
				left: 0;
				bottom: 0;
				width: 100upx;
				height: 8upx;
				position: absolute;
				background-color: $uni-color-primary;
				border-radius: 8upx;
			}
		}
	}
</style>
