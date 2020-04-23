<template>
	<view>
		<lee-tabs :tabs="tabs">
			<!-- <view class="search-box" slot="column-before">
				<lee-search placeholder="搜索" disabled></lee-search>
			</view> -->

			<!-- 商品 -->
			<scroll-view class="shop-content" scroll-y="true" slot="content-0">
				<view class="shop-content-label">热销</view>
				<view class="shop-content-list">
					<view class="shop-content-item"
						v-for="(v, k) of list"
						:key="k"
					>
						<lee-shop :name="v.name"
							:price="v.price"
							:thumbnail="v.thumbnail.src"
							@action="goodsActionHandle(v)"
						></lee-shop>
					</view>
				</view>
			</scroll-view>
			<!-- 商品END -->
		</lee-tabs>
		
		<lee-fav-nav></lee-fav-nav>
	</view>
</template>

<script>
	import LeeTabs from '@/components/lee-tabs.vue'
	import LeeSearch from '@/components/lee-search.vue'
	import LeeShop from '@/components/lee-shop.vue'
	import LeeFavNav from '@/components/lee-fav-nav/lee-fav-nav.vue'
	import { mapMutations } from 'vuex'
	
	export default {
		components: {
			LeeTabs,
			LeeSearch,
			LeeShop,
			LeeFavNav
		},
		data() {
			return {
				tabs: ['商品'],
				page: 1,
				pagesize: 10,
				total: 0,
				list: []
			}
		},
		async created() {
			await this.getShops(1)
		},
		methods: {
			// 获取商品列表
			async getShops(page, cover) {
				uni.showLoading({ title: '加载中' })
				const { data: res } = await this.$http.post('/product/list', {
					page: Math.max(1, page),
					pagesize: this.pagesize
				})
				uni.hideLoading()
				if (res.status === 'ok') {
					this.page = res.data.page
					this.pagesize = res.data.pagesize
					this.total = res.data.total
					this.list = cover
						? res.data.list.slice(0)
						: this.list.concat(res.data.list)
				}
			},
			
			goodsActionHandle(goods) {
				this.$utils.checkUser(user => {
					// 跳转到结算页面
					uni.navigateTo({
						url: `/pages/order/order?id=${goods._id}`
					})
				})
			},
			
			...mapMutations(['addToCart'])
		}
	}
</script>

<style lang="scss">
	// 搜索栏
	.search-box {
		width: 240upx;
		height: 100%;
		box-sizing: border-box;
		padding: $spacing-xs $spacing-sm;
		position: relative;
	}
	
	// 商品列表
	.shop-content {
		height: 100%;
		
		&-label {
			padding: $spacing-sm $spacing-base;
			padding-bottom: 0;
			font-size: $text-sm;
			color: $uni-text-color-grey;
		}
		
		&-list {
			padding: $spacing-sm;
			display: flex;
			flex-wrap: wrap;
		}
		&-item {
			width: 50%;
			box-sizing: border-box;
			position: relative;
			padding: $spacing-xs;
		}
	}
</style>
