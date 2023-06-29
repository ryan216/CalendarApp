<template>
	<view class="page-container">
		<view class="back" @click="handleBack">
			<text class="back-btn">返回日历
			</text>
		</view>
		<view class="date">
			{{dateCN}}
		</view>
		<view class="item-list">
			<view class="item" v-for="item in items" :key="item._id" @click="handleEdit(item)">
				<view class="header">
					<view class="theme">{{item.theme}}</view>
					<view class="content">{{item.content}}</view>
				</view>
				<view class="footer">￥{{item.price}}</view>
			</view>
		</view>
		<view class="btn-box">
			<view class="btn" @click="handleAdd">
				新增记账
			</view>
		</view>

	</view>
</template>

<script>
	import request from '../../utils/request.js';
	export default {
		onLoad(option) {
			console.log(option)
			this.dateCN = option.dateCN
			this.date = option.date

		},
		created() {

		},
		data() {
			return {
				dateCN: '',
				date: '',
				items: []
			}
		},
		mounted() {
			uni.$on('newItemEvent', arg => {
				this.getItem()
			})
			this.getItem()
		},
		methods: {
			getItem() {
				uni.showLoading()
				const date = this.date
				const authorization = uni.getStorageSync('token')
				console.log(authorization)
				const token = "Bearer " + authorization
				const header = {
					"authorization": token
				}
				request({
					url: '/thing/list',
					method: 'GET',
					header: header
				}).then(res => {
					if (res.flag === true) {
						console.log(res)
						this.items = res.data
						uni.hideLoading()
					}
				})

				console.log(this.items)
				uni.hideLoading()

			},
			handleBack() {
				uni.navigateBack()
			},
			handleAdd() {
				uni.navigateTo({
					url: `./add?date=${this.date}`,
				})
			},
			handleEdit(item) {
				uni.navigateTo({
					url: `./add?date=${this.date}&id=${item._id}`,
				})
			}
		}
	}
</script>

<style>
	* {
		box-sizing: border-box;
	}

	.back {
		margin: 40rpx 0;
	}

	.back-btn {
		box-sizing: border-box;
		border: 4rpx solid #999;
		border-radius: 40rpx;
		color: #999;
		font-size: 24rpx;
		padding: 8rpx 40rpx;
		margin: 20rpx 32rpx 0 32rpx;
	}

	.date {
		font-size: 48rpx;
		font-weight: 500;
		margin: 0 auto;
		padding: 20rpx;
		text-align: center;
		background: #eee;
	}

	.btn-box {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 40rpx 0;
	}

	.btn {
		border: 4rpx solid #777;
		padding: 16rpx 96rpx;
		display: inline-block;
		border-radius: 40rpx;
		margin: 0 auto;
		font-weight: bold;
	}

	.item-list {
		padding: 32rpx;
		box-sizing: border-box;
		position: relative;
	}

	.item {
		border: 4rpx solid #999;
		border-radius: 16rpx;
		padding: 20rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.item .header {
		flex: 1;
		font-size: 24rpx;
		color: #86909c;
	}

	.item .header .theme {
		font-size: 32rpx;
		color: #272e3b;
	}

	.item .footer {
		min-width: 100rpx;
		color: #F53F3F;
	}
</style>