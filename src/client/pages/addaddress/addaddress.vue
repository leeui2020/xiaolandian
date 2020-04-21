<template>
	<view v-if="user">
		<uni-list>
			<!-- 姓名 -->
			<uni-list-item title="收货人" :showArrow="false">
				<input v-model="name" type="text" placeholder="请填写收货人" slot="right">
			</uni-list-item>
			<!-- 手机号码 -->
			<uni-list-item title="手机号码" :showArrow="false">
				<input v-model="phone" type="text" placeholder="请填写手机号码" slot="right">
			</uni-list-item>
			<!-- 所在地区 -->
			<uni-list-item title="所在地区" @click="openCityPopup">
				<text slot="right">{{ city | cityFormatter }}</text>
			</uni-list-item>
			<!-- 详细地址 -->
			<uni-list-item title="详细地址">
				<textarea v-model="address" placeholder="请填写详细地址" slot="right" />
			</uni-list-item>
			<!-- 设为默认 -->
			<uni-list-item
				title="设为默认地址"
				showSwitch
				:switchChecked="isDefault"
				:showArrow="false"
				@switchChange="setDefaultHandler"
			></uni-list-item>
		</uni-list>
		<button type="primary" @click="saveBtnHandler">保存</button>
		
		<!-- 选择城市 -->
		<uni-popup ref="popup" type="bottom">
			<view class="popup-content">
				<view class="caption">请选择</view>
				<lee-select-city
					:defaultSelected="city"
					height="calc(100vh - 300upx)"
					@submit="citySelectHandler"
				/>
			</view>
		</uni-popup>
		<!-- 选择城市END -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				phone: '',
				city: [],
				address: '',
				isDefault: false,
				user: null
			}
		},
		filters: {
			// 格式化城市
			cityFormatter(list) {
				return list.join('/')
			}
		},
		created() {
			this.$utils.checkUser(user => {
				this.user = user
			})
		},
		methods: {
			// 打开选择城市弹窗
			openCityPopup() {
				this.$refs.popup.open()
			},
			
			// 选择了城市
			citySelectHandler({ simple }) {
				this.city = simple
				this.$refs.popup.close()
			},
			
			// 设置默认
			setDefaultHandler({ value }) {
				this.isDefault = value
			},
			
			// 点击保存按钮
			async saveBtnHandler() {
				const {
					name,
					phone,
					city,
					address,
					isDefault
				} = this
				const showErr = title => uni.showToast({
					title,
					icon: 'none',
				})
				const { userId } = this.user
				
				if (!userId) return showErr('请登录')
				if (!name) return showErr('请填写收货人')
				if (!phone) return showErr('请填写手机号码')
				if (!this.$utils.checkPhone(phone)) return showErr('手机号码格式错误')
				if (!city || city.length === 0) return showErr('请选择城市')
				if (!address) return showErr('请填写详细地址')
				
				uni.showLoading({ title: '正在保存' })
				const { data: res } = await this.$http.post('/address/add', {
					name,
					phone,
					city,
					address,
					isDefault,
					userId
				})
				uni.hideLoading()
				if (res.status !== 'ok') {
					return showErr(res.errmsg)
				}
				uni.showToast({ title: '保存成功' })
				this.$store.dispatch('getAddress')
				uni.navigateBack({})
			}
		}
	}
</script>

<style lang="scss">
	textarea {
		width: 310upx;
		height: 200upx;
	}
	
	button {
		margin: $spacing-base;
	}
	
	.popup-content {
		padding-left: 0;
		padding-right: 0;
		
		> .caption {
			margin-left: $spacing-sm;
			margin-right: $spacing-sm;
		}
	}
</style>
