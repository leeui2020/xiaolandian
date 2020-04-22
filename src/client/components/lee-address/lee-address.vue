<template>
	<view class="content">
		<view class="content-list">
			<lee-address-card
				class="content-item"
				v-for="(v, k) of address"
				:key="k"
				:name="v.name"
				:phone="v.phone"
				:isDefault="v.isDefault"
				:city="v.city"
				:address="v.address"
				@click="selectHandler(v)"
				@edit="gotoEditAddressPage(v)"
			></lee-address-card>
		</view>
		<button type="primary" @click="gotoAddAddressPage">添加新地址</button>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import LeeAddressCard from './lee-address-card.vue'
	let addressLoaded = false
	
	export default {
		components: {
			LeeAddressCard
		},
		data() {
			return {
			}
		},
		computed: {
			...mapState(['address'])
		},
		async created() {
			if (!addressLoaded) {
				await this.getAddress()
				addressLoaded = true
			}
		},
		methods: {
			// 跳转到添加地址页面
			gotoAddAddressPage() {
				uni.navigateTo({
					url: '/pages/addaddress/addaddress'
				})
			},
			
			// 跳转到编辑地址页面
			gotoEditAddressPage(item) {
				uni.navigateTo({
					url: `/pages/editaddress/editaddress?_id=${item._id}`
				})
			},
			
			// 选择收货地址
			selectHandler(item) {
				this.$emit('select', item)
			},
			
			...mapActions(['getAddress'])
		}
	}
</script>

<style lang="scss">
	.content-list {
		margin-bottom: $spacing-base;
	}
</style>
