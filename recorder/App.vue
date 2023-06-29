<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			uni.login({
				success(res) {
					console.log('app login:', res)
					uniCloud.callFunction({
						name: 'user-co',
						data: {
							code: res.code
						},
						success({
							result
						}) {
							uni.setStorageSync('uid', result)
						}
					})
				}
			})
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "@/common/common.scss";
</style>