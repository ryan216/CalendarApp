<template>
	<view>

		<view style="width: 90%; margin: 200rpx auto;">
			<!-- 200rpx  == 100px -->
			<view style=" margin-bottom: 70rpx; font-size: 60rpx; color: orange; text-align: center;">注 册</view>
			<uni-forms ref="form" :modelValue="form" :rules="rules">
				<uni-forms-item name="username">
					<uni-easyinput v-model="form.username" prefixIcon="person" placeholder="请输入用户名"></uni-easyinput>
				</uni-forms-item>

				<uni-forms-item name="password">
					<uni-easyinput type="password" v-model="form.password" prefixIcon="locked" placeholder="请输入密码">
					</uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="confirm">
					<uni-easyinput type="password" v-model="form.confirm" prefixIcon="locked" placeholder="请确认密码">
					</uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="sex">
					<uni-data-select placeholder="请选择性别" v-model="value" :localdata="range" @change="change">
					</uni-data-select>
				</uni-forms-item>
				<uni-forms-item name="age">
					<uni-easyinput type="text" v-model="form.age" prefixIcon="vip-filled" placeholder="请输入年龄">
					</uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="department">
					<uni-easyinput type="text" v-model="form.department" prefixIcon="location" placeholder="请输入院系">
					</uni-easyinput>
				</uni-forms-item>
			</uni-forms>

			<view>
				<button type="default" @click="register">注 册</button>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js';
	export default {
		data() {
			return {
				value: 3,
				range: [{
						value: 0,
						text: "男"
					},
					{
						value: 1,
						text: "女"
					},
				],
				form: {
					username: '',
					password: '',
					sex: ''
				},
				rules: {
					username: {
						rules: [{
							required: true,
							errorMessage: '请输入用户名'
						}],
						validateTrigger: 'submit'
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入密码'
						}],
						validateTrigger: 'submit'
					},
					confirm: {
						rules: [{
							required: true,
							errorMessage: '请确认密码'
						}],
						validateTrigger: 'submit'
					},
					age: {
						rules: [{
								required: true,
								errorMessage: '请输入年龄'
							},
							{
								format: 'number',
								errorMessage: '年龄只能输入数字'
							}
						],
						validateTrigger: 'submit'
					},
					sex: {
						rules: [{
							required: true,
							errorMessage: '请输入性别'
						}],
						validateTrigger: 'submit'
					},
					department: {
						rules: [{
							required: true,
							errorMessage: '请输入院系'
						}],
						validateTrigger: 'submit'
					},
				}
			}
		},
		methods: {
			change(e) {
				console.log("e:", e);
				this.form.sex = this.range[e].text
			},
			register() {
				this.$refs.form.validate().then(res => {
					if (this.form.password !== this.form.confirm) {
						uni.showToast({
							icon: "none",
							title: '两次密码输入不一致'
						})
						return
					}
					request({
						url: '/user/register',
						method: 'POST',
						data: this.form
					}).then(res => {
						console.log(res)
						if (res.flag === true) {
							// 跳转页面
							uni.navigateTo({
								url: '/pages/login/login'
							})
							uni.showToast({
								title: '注册成功'
							})
						}
					})
				}).catch(err => {
					console.log('表单错误信息：', err);
				})

			}
		}
	}
</script>

<style>

</style>
