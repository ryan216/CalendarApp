<template>
	<view class="" style="">
		<view class="" style="height: 100px;background-color:#00BFFF">

			<view class="center" style="">
				<u-avatar v-if="hasLogin&&userInfo.avatar_file&&userInfo.avatar_file.url"
					:src="userInfo.avatar_file.url" shape="circle" size="82" style="margin-top: -50px;"></u-avatar>
				<u-avatar v-else :src="src" shape="circle" size="82" style="margin-top: -50px;"></u-avatar>
			</view>
		</view>
		<view class="">
			<view class="" style=" margin-left: 20px;margin-right: 20px;">
				<view class="column align-items"
					style="height: 130px; border-radius:10px; background-color:#fff ;display: flex;justify-content: center;margin-top:-60px;">
					<text
						style="margin-top:20px;font-size:20px;">{{userInfo.nickname||userInfo.username||userInfo.mobile}}</text>
				</view>
			</view>
			<view class="" style="margin:6px 20px;">
				<view class="" style=" height:105px;background-color:#fff;display: flex;border-radius: 10px;">
					<view class="column" style="width: 100%;">
						<view class="space-between border_buttom align-items" style="height:50px; margin:0 20px;"
							@click="tologin">
							<view class="space-between " style="width: 80px;">
								<view class="">
									<u-icon name="setting" color="#A9A9A9" size="25"></u-icon>
								</view>
								<view class="center ">
									设置
								</view>
							</view>
							<view class="">
								<u-icon name="arrow-right" color="#A9A9A9" size="20"></u-icon>
							</view>
						</view>


						<!-- <view class="" style="height: 50px;">
							<view class="space-between align-items " style="width: 100%;">
								<view class="align-items space-between border_buttom"
									style="width:100%;margin:0 20px;height:50px;" @click="totongji">
									<view class="space-between align-items" style="width: 80px;">
										<view class="center">
											<u-icon name="file-text" color="#A9A9A9" size="25"></u-icon>
										</view>
										<view class="center">
											统计
										</view>
									</view>
									<view class="" style="">
										<u-icon name="arrow-right" color="#A9A9A9" size="20"></u-icon>
									</view>
								</view>
							</view>
						</view> -->

						<view class="center" style="margin:0 20px;height: 50px; " @click="toinfo">
							<view class="space-between align-items" style="width: 100%;">
								<view class="space-between" style="width: 100px;">
									<view class="">
										<u-icon name="file-text" color="#A9A9A9" size="25"></u-icon>
									</view>
									<view class="center">
										用户信息
									</view>
								</view>
								<view class="">
									<u-icon name="arrow-right" color="#A9A9A9" size="20"></u-icon>
								</view>
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="center" style=" height:50px;background-color:#fff;margin-top: 6px;border-radius: 10px;"
					@click="tobaoming_list">
					<view class=""
						style="display: flex;justify-content: space-between;align-items: center;width:100%;margin:0 20px;">
						<view class=""
							style="width: 100px;display:flex;justify-content: space-between;align-items: center;">
							<view class="center">
								<u-icon name="file-text" color="#A9A9A9" size="25"></u-icon>
							</view>
							<view class="center">
								我报名的
							</view>
						</view>
						<view class="">
							<u-icon name="arrow-right" color="#A9A9A9" size="20"></u-icon>
						</view>
					</view>
				</view> -->
				<!-- <view v-if="uniIDHasRole('admin')" style="margin-top: 6px;">
					<view class="center"
						style=" height:50px;background-color:#fff;border-top-left-radius:10px;border-top-right-radius:10px;"
						@click="toinfo">
						<view class="border_buttom"
							style="display: flex;justify-content: space-between;align-items: center;width:100%;margin:0 20px;">
							<view class=""
								style="width: 100px;display:flex;justify-content: space-between;align-items: center;">
								<view class="center">
									<u-icon name="file-text" color="#A9A9A9" size="25"></u-icon>
								</view>
								<view class="center">
									我发布的
								</view>
							</view>
							<view class="">
								<u-icon name="arrow-right" color="#A9A9A9" size="20"></u-icon>
							</view>
						</view>
					</view>
					<view class="center"
						style=" height:50px;background-color:#fff;border-bottom-left-radius:10px;border-bottom-right-radius:10px;"
						@click="toshenqing">
						<view class=""
							style="display: flex;justify-content: space-between;align-items: center;width:100%;margin:0 20px;">
							<view class=""
								style="width: 100px;display:flex;justify-content: space-between;align-items: center;">
								<view class="center">
									<u-icon name="file-text" color="#A9A9A9" size="25"></u-icon>
								</view>
								<view class="center">
									报名申请
								</view>
							</view>
							<view class="">
								<u-icon name="arrow-right" color="#A9A9A9" size="20"></u-icon>
							</view>
						</view>
					</view>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	export default {
		data() {
			return {
				share: {
					title: "我的",
					path: 'pages/my/my',
					imageUrl: '',
					desc: '',
					content: ''
				},
				curNow: 0,
				zhongli: 0,
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'
			}
		},
		computed: {
			userInfo() {
				return store.userInfo
			},
			hasLogin() {
				return store.hasLogin
			}
		},
		methods: {
			toshenqing() {
				uni.navigateTo({
					url: '../../pages/baoming_shenqing/baoming_shenqing'
				})
			},
			totongji() {
				uni.navigateTo({
					url: '../../pages/tongji/tongji'
				})
			},
			tobaoming_list() {
				uni.navigateTo({
					url: '../../pages/baoming_history/baoming_history'
				})
			},
			toinfo() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo'
				})
			},
			tologin() {
				uni.navigateTo({

					url: '/pages/login/login'
				})
			},
			toedit() {
				uni.navigateTo({
					url: '/pages_self/edit/edit'
				})
			},
			tolunbotu() {
				uni.navigateTo({
					url: '/pages_self/lunbotu/lunbotu'
				})
			},
			tobaojiabiao() {
				uni.navigateTo({
					url: '/pages_self/baojiabiao/baojiabiao'
				})
			},
			toyuyuebiao() {
				uni.navigateTo({
					url: '/pages_self/yuyuebiao/yuyuebiao'
				})
			}



		}
	}
</script>
<style lang="scss">
	page {
		background-color: #F5F5F5;
	}
</style>