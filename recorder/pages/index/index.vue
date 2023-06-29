<template>
	<view>
		<unicloud-db v-slot:default="{data, loading, error, options}" collection="active">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				<view class="center " v-if="uniIDHasRole('admin')">
					<view class="space-between align-items " style="height: 60px;width:90%;margin-top: 40px;">
						<view class="">
							活动
						</view>
						<view class="" @click="tofabu">
							<u-icon name="plus-circle" color="#00BFFF" size="40"></u-icon>
						</view>
					</view>
				</view>




				<view class="" v-for='item in data' @click="todetail(item)">

					<view class="column">
						<view class="space-between align-items"
							style="margin:5px 20px;border-bottom:1px solid #DDDDDD;height: 50px;">
							<view class="">
								<text>{{item.theme}}</text>
							</view>
							<view class="space-between align-items" style="width: 140px;">
								<text>{{item.time}}</text>
								<u-icon name="arrow-right" color="#a8a8a8" size="22"></u-icon>
							</view>
						</view>
					</view>



				</view>
































































			</view>
		</unicloud-db>
















		<view class="">
			<u-modal :show="show" content="" @confirm="confirm(shanchu)" height="300px" ref="uModal" :asyncClose="true"
				showCancelButton @cancel="cancel">
				<view class="">
					是否删除这条信息？
				</view>
			</u-modal>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				// time: null,
				// timestamp: '1581170184'
				show: false
			};
		},
		onLoad() {
			// this.time = uni.$u.timeFormat(this.timestamp, 'yyyy-mm-dd');
		},
		methods: {
			todetail(e) {
				uni.setStorageSync('active', e);
				uni.navigateTo({
					url: '../../pages/huodong_detail/huodong_detail'
				})
				console.log(e)
			},
			tobaoming() {
				uni.navigateTo({
					url: '../../pages/baoming/baoming'
				})
			},
			tologoin() {
				uni.navigateTo({
					url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
				})
			},
			tofabu() {
				uni.navigateTo({
					url: '../../pages/active/active'
				})
			},

			baojiadetail(e) {
				console.log(e)
				uni.setStorageSync('baojiabiao', e)
				uni.navigateTo({
					url: '/pages/baojiabiaoxiangqing/baojiabiaoxiangqing'
				})
			},
			showModal() {
				this.show = true;
			},
			baojiadel(item) {
				this.shanchu = item
				this.showModal()
			},



			async confirm(item) {
				const db = uniCloud.database();
				const collection = db.collection('baojia') // 获取表对象
				const res = await collection.doc(item._id).remove() // 根据id删除记录
				console.log(item._id)
				uni.reLaunch({
					url: '../../pages_self/baojiabiao/baojiabiao'
				})
			},
			cancel() {
				uni.switchTab({
					url: '../../pages_self/index/index'
				})
			},




		}
	}
</script>

<style lang="scss">

</style>