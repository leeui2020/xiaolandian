<template>
	<view class="lee-tabs" :style="{ height }">
		<!-- 导航区域 -->
		<scroll-view class="lee-tabs-column" scroll-x="true" >
			<view class="lee-tabs-column-content">
				<slot name="column-before"></slot>
				<view class="lee-tabs-list">
					<view class="lee-tabs-item"
						v-for="(v, k) of tabs"
						:key="k"
						:class="{ active: currentIndex === k }"
						@click="selectTabsHandler(k)"
					>
						{{ v }}
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 导航区域END -->
		
		<!-- 内容区域 -->
		<view class="lee-tabs-content">
			<swiper class="lee-tabs-swiper" :current="currentIndex" @change="swiperChangeHandler">
				<swiper-item class="lee-tabs-swiper-item"
					v-for="(v, k) of tabs"
					:key="k"
				>
					<slot :name="`content-${k}`" v-if="loaded.includes(k)"></slot>
				</swiper-item>
			</swiper>
		</view>
		<!-- 内容区域END -->
	</view>
</template>

<script>
	export default {
		props: {
			tabs: {
				type: Array,
				required: true
			},
			height: {
				type: String,
				default: '100vh'
			},
			defaultIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				currentIndex: -1,
				loaded: []
			}
		},
		created() {
			this.currentIndex = this.defaultIndex
		},
		methods: {
			// 点击导航
			selectTabsHandler(index) {
				this.currentIndex = index
			},
			
			swiperChangeHandler(e) {
				this.currentIndex = e.detail.current
			}
		},
		watch: {
			currentIndex(v) {
				if (!this.loaded.includes(v)) {
					this.loaded.push(v)
				}
			}
		}
	}
</script>

<style lang="scss">
	$column-height: 100upx;
	$item-width: 140upx;
	
	.lee-tabs {
		display: flex;
		flex-direction: column;
		
		&-column {
			height: $column-height;
			&-content {
				height: $column-height;
				background-color: $uni-bg-color;
				box-shadow: 0 2upx 2upx rgba(0, 0, 0, .15);
				display: flex;
			}
		}
		
		// 导航
		&-list {
			height: $column-height;
			display: flex;
		}
		&-item {
			height: $column-height;
			min-width: $item-width;
			line-height: $column-height;
			text-align: center;
			position: relative;
			&.active {
				color: $uni-color-primary;
			}
			&.active::after {
				content: '';
				left: 25%;
				bottom: 0;
				width: 50%;
				height: 6upx;
				border-radius: 6upx;
				position: absolute;
				background-color: $uni-color-primary;
			}
		}
		
		// 内容容器
		&-content {
			flex: 1;
			height: 0;
			position: relative;
		}
		&-swiper {
			height: 100%;
		}
	}
</style>
