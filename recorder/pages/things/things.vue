<template>
	<view class="edit">
		<view class="title">
			<input type="text" v-model="artObj.time" placeholder="请输入时间:" placeholder-class="placeholderclass">
		</view>
		<view class="title">
			<input type="text" v-model="artObj.address" placeholder="请输入地点:" placeholder-class="placeholderclass">
		</view>
		<!-- <view class="title">
			<input type="text" v-model="artObj.request" placeholder="请输入要求:" placeholder-class="placeholderclass">
		</view>
		<view class="title">
			<input type="text" v-model="artObj.people_num" placeholder="请输入参加人数:" placeholder-class="placeholderclass">
		</view>
		<view class="title">
			<input type="text" v-model="artObj.phone" placeholder="请输入联系电话:" placeholder-class="placeholderclass">
		</view>
		<view class="title">
			<input type="text" v-model="artObj.people" placeholder="请输入联系人:" placeholder-class="placeholderclass">
		</view>
		<view class="title">
			<input type="text" v-model="artObj.stop_date" placeholder="请输入截止日期:" placeholder-class="placeholderclass">
		</view> -->
		<view class="title">
			<input type="text" v-model="artObj.theme" placeholder="请输入主题:" placeholder-class="placeholderclass">
		</view>





		<view class="content">
			<editor class="myEdit" placeholder="请输入内容:" show-img-size show-img-toolbar show-img-resize
				@ready="onEditReady" @focus="onFocus" @statuschange="onstatuschange"></editor>
		</view>
		<view style="padding-top: 5px;">
			<u-button @click="onSubmit" type="primary" text="确认"></u-button>
		</view>
		<view v-if="toolShow" style="display: flex;flex-direction:column;justify-content: center;align-items: center;">
			<view class="tools " @click="clickinsertImage" style="font-size: 50px;"><text>+</text></view>
			<!-- <view class="item" @click="editok"><text class="iconfont icon-fanhui"></text></view> -->
		</view>


		<!-- {{artObj.avatar}} -->
	</view>
</template>

<script>
	// 导入地图模块
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	import {
		getImgSrc
	} from "@/utils/tools.js"
	const db = uniCloud.database()
	export default {
		data() {
			return {
				toolShow: false,
				headShow: false,
				boldShow: false,
				artObj: {
					time: "",
					content: "",
					description: "",
					picurls: "",
					address: "",
					request: "",
					people_num: "",
					phone: "",
					people: "",
					stop_date: "",
					theme: ""
				}
			};
		},
		computed: {
			userInfo() {
				return store.userInfo
				console.log(store)
			},
			hasLogin() {
				return store.hasLogin
			}
		},

		methods: {
			touxiang(store) {

				this.artObj.avatar = store.userInfo.avatar_file.url
				console.log(store.userInfo.avatar_file.url)
			},




			// 点击提交按钮
			onSubmit() {
				// this.touxiang(store)
				this.editorCtx.getContents({
					success: res => {

						this.artObj.description = res.text.slice(0, 50);
						this.artObj.content = res.html;
						this.artObj.picurls = getImgSrc(res.html)
						console.log(this.artObj)
						uni.showLoading({
							title: "保存中..."
						})
						this.addData();
					}
				})
			},
			addData() {
				db.collection("active").add({
					...this.artObj
				}).then(res => {
					console.log(res)
					uni.hideLoading()
					uni.showToast({
						title: "保存成功"
					})
					setTimeout(() => {
						uni.reLaunch({
							url: "/pages/index/index"
						})
					}, 800)
				})
			},
			checkStatus(name, detail, obj) {
				if (detail.hasOwnProperty(name)) {
					this[obj] = true;

				} else {
					this[obj] = false;
				}
			},
			onstatuschange(e) {
				let detail = e.detail
				this.checkStatus("header", detail, "headShow");
				this.checkStatus("bold", detail, "boldShow");
			},
			// 添加图像
			clickinsertImage() {
				uni.chooseImage({
					success: async res => {
						uni.showLoading({
							title: "上传中请稍后",
							mask: true
						})
						for (let item of res.tempFiles) {
							let suffix = item.path.substring(item.path.lastIndexOf("."));
							let randomName = Date.now() + "" + String(Math.random()).substr(3, 6) + suffix

							let res = await uniCloud.uploadFile({

								filePath: item.path,
								cloudPath: item.name || randomName
							})
							this.editorCtx.insertImage({
								src: res.fileID


							})
						}
						uni.hideLoading()
					}
				})
			},
			clickHead() {
				this.headShow = !this.headShow
				this.editorCtx.format("header", this.headShow ? 'h1' : false)
			},
			clickBold() {
				this.boldShow = !this.boldShow
				this.editorCtx.format("bold")
			},
			editok() {
				this.toolShow = false;
			},
			onFocus() {
				this.toolShow = true
			},
			// 添加分割线
			clickDivider() {
				this.editorCtx.insertDivider();
			},
			onEditReady() {
				uni.createSelectorQuery().in(this).select('.myEdit').fields({
					size: true,
					context: true
				}, res => {
					console.log(res);
					this.editorCtx = res.context
				}).exec()
			}
		}
	}
</script>

<style lang="scss">
	/deep/ .ql-blank::before {
		font-style: normal;
		color: #e0e0e0;
	}

	.edit {
		padding: 30rpx;

		.title {
			input {
				height: 120rpx;
				font-size: 46rpx;
				border-bottom: 1px solid #e4e4e4;
				margin-bottom: 30rpx;
				color: #000;
			}

			.placeholderclass {
				color: #e0e0e0;
			}
		}

		.content {
			margin-bottom: -40px;

			.myEdit {
				height: 30px;
				margin-bottom: 20rpx;
			}
		}

		.tools {
			margin-top: 5px;
			width: 70px;
			height: 60px;
			background: #fff;
			border: 1rpx solid #A9A9A9;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #A9A9A9;
		}
	}
</style>