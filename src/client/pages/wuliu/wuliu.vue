<template>
	<lee-logistics height="100%" :no="nu"></lee-logistics>
</template>

<script>
	export default {
		data() {
			return {
				nu: this.$route.query.nu
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
</style>
