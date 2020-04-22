<template>
	<view v-if="init">
		<uni-list>
			<!-- 产品 -->
			<uni-list-item
				:title="goods.name"
				:thumb="goods.thumbnail.src"
				:showArrow="false"
			></uni-list-item>
			<!-- 单价 -->
			<uni-list-item
				title="单价"
				:rightText="goods.price | priceFormatter"
				:showArrow="false"
			></uni-list-item>
			<!-- 数据 -->
			<uni-list-item title="数量" :showArrow="false">
				<uni-number-box
					:value="count"
					:min="1"
					slot="right"
					@change="countChangeHandler"
				/>
			</uni-list-item>
			<!-- 收货地址 -->
			<uni-list-item title="收货地址" @click="openAddressPopup">
				<view class="address-content" slot="right">
					<text v-if="address">{{ address | addressFormatter }}</text>
					<text class="tip" v-else>选择收货地址</text>
				</view>
			</uni-list-item>
		</uni-list>
		
		<!-- 结算栏 -->
		<view class="bar">
			<text>合计：</text>
			<text class="price">{{ totalFee | priceFormatter }}</text>
			<button class="action" type="primary" @click="submitHandler">结算</button>
		</view>
		<!-- 结算栏END -->
		
		<!-- 选择收货地址 -->
		<uni-popup ref="popup" type="bottom">
			<view class="popup-content">
				<view class="caption">收货地址</view>
				<lee-address @select="selectAddressHandler" showEdit />
			</view>
		</uni-popup>
		<!-- 选择收货地址END -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				init: false,
				goods: null,
				count: 1,
				address: null
			}
		},
		computed: {
			totalFee() {
				if (!this.goods) return 0
				return this.goods.price * this.count
			}
		},
		filters: {
			// 格式化价格
			priceFormatter(v) {
				return `￥${v / 100}`
			},
			
			// 格式化收货地址
			addressFormatter(item) {
				return item.city.concat(item.address).join(' ')
			}
		},
		async created() {
			await this.getGoodsDetail(this.$route.query.id)
		},
		methods: {
			// 获取商品详情
			async getGoodsDetail(_id) {
				if (!_id) return
				uni.showLoading({ title: '正在加载' })
				const { data: res } = await this.$http.post('/product/detail', { _id })
				uni.hideLoading()
				if (res.status === 'ok') {
					this.goods = res.data
					this.init = true
				}
			},
			
			// 数量变化监听
			countChangeHandler(count) {
				this.count = count
			},
			
			// 打开选择收货地址弹窗
			openAddressPopup() {
				this.$refs.popup.open()
			},
			
			// 选择收货地址
			selectAddressHandler(item) {
				this.address = item
				this.$refs.popup.close()
			},
			
			// 点击结算按钮
			async submitHandler() {
				const { goods, count, address } = this
				const showErr = title => uni.showToast({
					icon: 'none',
					title
				})
				
				if (!goods) return showErr('请选择商品')
				if (!address) return showErr('请选择收货地址')
				
				uni.showLoading({ title: '正在提交' })
				const { data: res } = await this.$http.post('/order/create', {
					count,
					productId: goods._id,
					addressId: address._id
				})
				uni.hideLoading()
				if (res.status !== 'ok') {
					return showErr(res.errmsg)
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.uni-numbox {
		width: auto;
	}
	
	.tip {
		font-size: $text-sm;
		color: $uni-text-color-grey;
	}
	
	.bar {
		$height: 120upx;
		left: 0;
		bottom: 0;
		width: 100%;
		height: $height;
		position: fixed;
		background-color: $uni-bg-color;
		border-top: 2upx solid $uni-border-color;
		box-sizing: border-box;
		padding: 0 $spacing-base;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		
		> .price {
			color: $price-color;
			font-weight: 600;
			font-size: $text-xl;
		}
		
		> .action {
			display: inline-block;
			margin: 0;
			margin-left: $spacing-base;
		}
	}
	
	.address-content {
		max-width: 350upx;
	}
</style>
