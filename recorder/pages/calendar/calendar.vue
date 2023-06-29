<template>
	<view>
		<view class="calendar-container">
			<view class="calendar-header">
				<view class="header">
					<uni-icons type="back" size="20" @click="handleSwitchMonth(-1)"></uni-icons>
					<view class="header-body">
						<view>{{currentDate.year}}年{{currentDate.month}}月</view>
						<!-- <view style="text-align: center;">农历{{lunarMonth}}月</view> -->
					</view>
					<uni-icons type="forward" size="20" @click="handleSwitchMonth(1)"></uni-icons>
				</view>
				<!-- <view style>农历5月</view> -->
				<view class="week-header calendar-rows">
					<view class="calendar-cols" v-for="(week1, index) in weekHeader" :key="index">{{week1}}</view>
				</view>
			</view>

			<view class="calendar-body">
				<view class="calendar-rows" v-for="(row, index) in getCalendar" :key="index">
					<template>
						<view v-for="(week, index2) in row" class="calendar-cols" :key="index2"
							@click="choiceDate(week)">
							<view :class="week.date == today ? 'today' : ''">{{week.day}}</view>

							<view class="lunar">{{week.lunar}}</view>

							<template v-if="monthItems[week.date]">
								<!-- <view>test</view> -->

								<view class="tag" v-for="item in monthItems[week.date]">
									{{item.theme}}
								</view>
								<!-- <view class='tag'>{{week.date}}</view> -->
							</template>
						</view>
					</template>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		Calendar,
		sloarToLunar
	} from './calendar.js'
	import request from '../../utils/request.js';
	export default {
		data() {
			return {
				weekHeader: ['一', '二', '三', '四', '五', '六', '日'],
				today: '',
				lunarMonth: '',
				currentDate: {
					year: 0,
					month: 0,
					date: '',
					day: 0
				},
				firstDay: '',
				lastDay: '',
				calendar: '',
				monthDays: [],
				monthItems: {
					"2023-06-01": {
						"_id": "2",
						"theme": "test"
					}
				}
			};
		},
		onShow() {
			this.getMonthItems()
		},
		created() {
			const date = new Date()
			this.currentDate = {
				year: date.getFullYear(),
				month: date.getMonth() + 1,
				day: date.getDay(),
				date: date.getDate()
			}

			this.calendar = new Calendar({
				firstWeekDay: 1
			})
			this.setFirstAndLast(this.currentDate.year, this.currentDate.month)
			this.today = this.calendar.format(new Date())
		},
		computed: {
			getCalendar() {
				const calendar = this.calendar.getMonthCalendar(this.currentDate.year, this.currentDate.month)
				calendar.forEach(rows => {
					rows.forEach(item => {
						if (item) {
							this.lunarMonth = item.lunarMonth
						}
					})
				})
				return calendar
			}
		},
		methods: {
			choiceDate(day) {
				console.log("日期")
				console.log(day.date)
				console.log(this.monthItems["2023-06-01"].theme)
				console.log("日期")
				uni.navigateTo({
					url: `/pages/createItem/createItem?date=${day.date}&week=${day.day}&dateCN=${day.dateCN}`
				})
			},
			getMonthItems() {
				uni.showLoading()
				const authorization = uni.getStorageSync('token')
				console.log(authorization)
				const token = "Bearer " + authorization
				const header = {
					"authorization": token
				}
				request({
					url: '/thing',
					method: 'GET',
					header: header
				}).then(res => {
					if (res.flag === true) {
						console.log(res)
						this.monthItems = res.data
						uni.hideLoading()
					}
				})



			},
			handleSwitchMonth(step) {
				const date = new Date(this.currentDate.year, this.currentDate.month - 1, 1, 0, 0, 0)
				date.setMonth(date.getMonth() + step)
				this.currentDate.year = date.getFullYear()
				this.currentDate.month = date.getMonth() + 1
				this.setFirstAndLast(this.currentDate.year, this.currentDate.month)
				this.getMonthItems()
			},
			setFirstAndLast(year, month) {
				const date = new Date(year, month - 1)
				this.firstDay = this.calendar.format(date)
				date.setMonth(date.getMonth() + 1)
				date.setDate(0)
				this.lastDay = this.calendar.format(date)

			}
		}

	}
</script>

<style lang="scss">
	.calendar-container {
		display: flex;
		flex-direction: column;
		position: fixed;
		width: 100%;
		height: 100%;

		.header {
			height: 160rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.header-body {
				margin: 0 20rpx;
			}
		}

		.week-header {

			.calendar-rows,
			.calendar-cols,
			.calendar-rows:last-child {
				border: none;
			}

			&.calendar-rows {
				height: 60rpx !important;
				line-height: 60rpx;
				flex-shrink: 0;
				flex-grow: 0;
			}

			.calendar-cols {
				color: #333;
			}
		}

		.calendar-rows {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-around;
			height: 100px;

			&:last-child {
				border-bottom: 1rpx solid #eee;
			}
		}

		.calendar-cols {
			flex: 1;
			border-left: 1rpx solid #eee;
			border-top: 1rpx solid #eee;
			box-sizing: border-box;
			height: 100%;
			overflow: hidden;
			overflow-y: auto;
			text-align: center;
			color: #555;
			display: flex;
			align-items: center;
			flex-direction: column;

			&:last-child {
				border-right: 1rpx solid #eee;
			}

			.tag {
				width: 90%;
				border-radius: 60px;
				margin-top: 20px;
				background: #FFE4BA;
				margin: 4rpx 0;
				height: 20px;
				line-height: 20px;
				font-size: 20rpx;
			}

			.lunar {
				font-size: 12px;
				color: #999;
			}
		}

		.calendar-body {
			flex: 1;
			display: flex;
			flex-direction: column;

		}

		.today {
			color: #F53F3F;
		}
	}
</style>