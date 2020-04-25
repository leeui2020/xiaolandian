<template>
	<view>
		<lee-tabs ref="tabs" :tabs="tabs" :defaultIndex="defaultIndex">
			<!-- 待支付订单 -->
			<LeeOrderCenter ref="content0" :status="0" slot="content-0"></LeeOrderCenter>
			<!-- 待发货订单 -->
			<LeeOrderCenter ref="content1" :status="1" slot="content-1"></LeeOrderCenter>
			<!-- 已发货订单 -->
			<LeeOrderCenter ref="content2" :status="2" slot="content-2"></LeeOrderCenter>
			<!-- 全部订单 -->
			<LeeOrderCenter ref="content3" :status="3" slot="content-3"></LeeOrderCenter>
		</lee-tabs>
	</view>
</template>

<script>
	import LeeTabs from '@/components/lee-tabs.vue'
	import LeeOrderCenter from '@/components-service/lee-order-center.vue'
	
	export default {
		components: {
			LeeTabs,
			LeeOrderCenter
		},
		data() {
			return {
				tabs: ['待支付', '待发货', '已发货', '全部'],
				defaultIndex: Number(this.$route.query.index || 0)
			}
		},
		async onPullDownRefresh() {
			const currentIndex = this.$refs.tabs.currentIndex
			const currentPanel = this.$refs[`content${currentIndex}`]
			if (!currentPanel) return
			await currentPanel.refreshData()
			uni.stopPullDownRefresh()
		}
	}
</script>

<style lang="scss">

</style>
