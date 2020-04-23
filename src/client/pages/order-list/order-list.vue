<template>
	<view>
		<lee-tabs :tabs="tabs">
			<!-- 待支付订单 -->
			<LeeOrderCenter :status="0" slot="content-0"></LeeOrderCenter>
			<!-- 待发货订单 -->
			<LeeOrderCenter :status="1" slot="content-1"></LeeOrderCenter>
			<!-- 已发货订单 -->
			<LeeOrderCenter :status="2" slot="content-2"></LeeOrderCenter>
			<!-- 全部订单 -->
			<LeeOrderCenter :status="3" slot="content-3"></LeeOrderCenter>
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
				tabs: ['待支付', '待发货', '已发货', '全部']
			}
		}
	}
</script>

<style lang="scss">

</style>
