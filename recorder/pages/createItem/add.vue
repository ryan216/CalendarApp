<template>
	<view>
		<view>
			<view class="form-box">
				<uni-forms label-position="top">
					<uni-forms-item label="主题" name="theme">
						<uni-easyinput type="text" v-model="formData.theme" placeholder="请输入主题" />
					</uni-forms-item>
					<uni-forms-item label="内容" name="content">
						<uni-easyinput type="text" v-model="formData.content" placeholder="请输入内容" />
					</uni-forms-item>
					<uni-forms-item label="收入\n(支出)" name="price">
						<uni-easyinput type="number" v-model="formData.price" placeholder="请输入收入(支出)" />
					</uni-forms-item>
				</uni-forms>
				<button type="primary" @click="submit('valiForm')">保存</button>

				<template v-if="formData.id">
					<view class="util-box" style="margin-top: 20px;">
						<button type="info" @click="remove">
							删除记事
						</button>
					</view>
				</template>
			</view>


		</view>

	</view>
</template>

<script>
	import request from '../../utils/request.js';
	export default {
		onLoad(option) {
			this.createAt = option.date
			if (option.id) {
				this.model = 'edit'
				this.formData.id = option.id
				this.getInfo(option.id)
			}
		},
		data() {
			return {
				id: '',
				model: 'add',
				formData: {
					id: '',
					theme: '',
					content: '',
					price: 0,
				},
				createAt: ''
			}
		},

		methods: {
			submit() {
				const createAt = this.createAt
				const data = {
					id: this.formData.id,
					theme: this.formData.theme,
					content: this.formData.content,
					price: this.formData.price,
					createAt: this.createAt,
					userId: ""
				}
				this.addData()

				uni.navigateBack()
			},
			addData() {
				const authorization = uni.getStorageSync('token')
				console.log(authorization)
				const token = "Bearer " + authorization
				const header = {
					"authorization": token
				}
				const data = {
					id: this.formData.id,
					theme: this.formData.theme,
					content: this.formData.content,
					price: this.formData.price,
					createAt: this.createAt,
					userId: ""
				}
				request({
					url: '/thing',
					method: 'POST',
					header: header,
					data: data
				}).then(res => {
					if (res.flag === true) {
						console.log(res)
					}
				})
			},

			getInfo(id) {
				const result = ""
				uni.showLoading()
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
						result = res.data
						uni.hideLoading()
					}
				})

				uni.hideLoading()

				if (result) {
					this.formData = {
						...result
					}
				}
			}
		}
	}
</script>

<style>
	.form-box {
		padding: 16px;
		box-sizing: border-box;
	}
</style>