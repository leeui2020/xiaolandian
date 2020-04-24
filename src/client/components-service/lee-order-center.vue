<template>
	<view class="defaults" v-if="list.length === 0">
		<view class="defaults-icon">
			<uni-icons type="cart-filled" color="#999" :size="50"></uni-icons>
		</view>
		<view class="defaults-title">暂无数据</view>
	</view>
	<!-- 订单列表 -->
	<scroll-view style="height: 100%;" scroll-y="true" v-else @scrolltolower="onScrollToLower">
		<view class="list">
			<lee-order-item
				:key="k"
				:item="v"
				class="list-item"
				v-for="(v, k) of list"
				@remove="removeOrder(v)"
				@cancel="cancelOrder(v)"
				@pay="payOrder(v)"
			/>
		</view>
		<view class="nomore" v-if="total === list.length">- 没有更多了 -</view>
	</scroll-view>
</template>

<script>
	import LeeOrderItem from './lee-order-item.vue'
	
	export default {
		components: {
			LeeOrderItem
		},
		props: {
			status: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				page: 1,
				pagesize: 10,
				total: 0,
				list: []
			}
		},
		computed: {
			
			// 筛选条件
			filter() {
				const filter = {
					timePayed: { $exists: false },
					timeRefund: { $exists: false },
					timeClosed: { $exists: false },
					timeConsign: { $exists: false }
				}
				// 待支付
				if (this.status === 0) {
					return filter
				}
				
				// 待发货
				if (this.status === 1) {
					filter.timePayed.$exists = true
					return filter
				}
				
				// 已发货
				if (this.status === 2) {
					filter.timePayed.$exists = true
					filter.timeConsign.$exists = true
					return filter
				}
				
				// 全部
				return {}
			}
		},
		created() {
			this.getOrderList(1)
		},
		methods: {
			
			// 获取订单列表
			async getOrderList(page, cover) {
				uni.showLoading({ title: '正在加载' })
				const { data: res } = await this.$http.post('/order/search', {
					page: Math.max(1, page),
					pagesize: this.pagesize,
					filter: this.filter
				})
				uni.hideLoading()
				if (res.status === 'ok') {
					this.page = res.data.page
					this.pagesize = res.data.pagesize
					this.total = res.data.total
					this.list = cover ? res.data.list : this.list.concat(res.data.list)
				}
			},
			
			// 删除订单
			removeOrder(item) {
				uni.showModal({
					title: '删除提示',
					content: '是否删除订单？',
					success: async ({ confirm }) => {
						if (!confirm) return
						uni.showLoading({ title: '正在删除' })
						const { data: res } = await this.$http
							.post('/order/remove', { _id: item._id })
						uni.hideLoading()
						if (res.status !== 'ok') {
							uni.showToast({ icon: 'none', title: res.errmsg })
							return
						}
						uni.showToast({ title: '删除成功' })
						await this.getOrderList(1, true)
					},
				})
			},
			
			// 取消订单
			cancelOrder(item) {
				uni.showModal({
					title: '取消提示',
					content: '是否取消订单？',
					success: async ({ confirm }) => {
						if (!confirm) return
						uni.showLoading({ title: '正在取消' })
						const { data: res } = await this.$http
							.post('/order/cancel', { _id: item._id })
						uni.hideLoading()
						if (res.status !== 'ok') {
							uni.showToast({ icon: 'none', title: res.errmsg })
							return
						}
						uni.showToast({ title: '取消成功' })
						await this.getOrderList(1, true)
					}
				})
			},
			
			// 去支付
			async payOrder(item) {
				await this.$utils.gotoPayment(item._id)
			},
			
			// 滚动到底部事件
			async onScrollToLower() {
				if (this.list.length < this.total) {
					await this.getOrderList(this.page + 1)
				}
			},
			
			// 上拉刷新
			async refreshData() {
				await this.getOrderList(1, true)
			}
		}
	}
</script>

<style lang="scss">
	.defaults {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: $uni-text-color-grey;
		
		&-icon {
			margin-bottom: $spacing-base;
		}
	}
	
	.list {
		padding: $spacing-base;
		position: relative;
		
		&-item + &-item {
			margin-top: $spacing-base;
		}
	}
</style>
