<template>
	<view class='setting'>

		<view class='s'>
			<!-- 自定义 -->
			<view class='t'>
				<view class='title'>
					<view>自定义</view>
				</view>
				<view class='content'>
					<view class='item'>
						<view>打开顶部城市天气快捷搜索</view>
						<switch color='#40a7e7' :checked='!setting.hiddenSearch'
							@change="switchChange($event,'hiddenSearch')"></switch>
					</view>
					<view class='item'>
						<view>显示生活指数信息</view>
						<switch color='#40a7e7' :checked='!setting.hiddenIndex'
							@change="switchChange($event,'hiddenIndex')"></switch>
					</view>
				</view>
			</view>

			<!-- 检查更新 -->
			<view class='t'>
				<view class='title'>
					<view>检查更新</view>
				</view>
				<view class='content'>
					<view class='item'>
						<view>
							<view>打开首页更新提醒</view>
							<view class='tip' catchtap='updateInstruc'>
								<image src='../../static/images/question.png'></image>
								<text v-if='enableUpdate'>在首页检测到新版本，会提示更新</text>
								<text v-if='!enableUpdate' style='flex:1;'>基础库版本需高于 1.9.90，当前基础库版本为
									{{SDKVersion}}</text>
							</view>
						</view>
						<switch color='#40a7e7' :checked='setting.forceUpdate'
							@change="switchChange($event,'forceUpdate')"></switch>
					</view>
				</view>
			</view>

			<!-- NFC -->
			<view class="t">
				<view class='title'>
					<view>NFC</view>
				</view>
				<view class='content'>
					<view class='item' @click='getHCEState'>
						<view>检测是否支持NFC</view>
						<image class='more' src='../../static/images/arrow.png'></image>
					</view>
				</view>
			</view>

			<!-- 屏幕亮度 -->
			<view class="t">
				<view class='title'>
					<view>屏幕亮度</view>
				</view>
				<view class='content'>
					<view class='item'>
						<view>
							<view>当前屏幕亮度</view>
							<view class='tip'>范围0~100，0 最暗，100 最亮</view>
						</view>
						<view>{{screenBrightness}}</view>
					</view>
					<view class='item' @change.stop='setScreenBrightness'>
						<view style='width:100%'>
							<view>设置屏幕亮度</view>
							<slider :value='screenBrightness' min='0' max='100' step='1' block-size='12'
								block-color='#40a7e7' activeColor='#40a7e7' show-value='true'
								bindchange='screenBrightnessChanging' @change.stop='screenBrightnessChanging'></slider>
						</view>
					</view>
					<view class='item'>
						<view>
							<view>保持常亮</view>
							<view class='tip'>仅在当前小程序、当次生效，离开小程序后设置失效</view>
						</view>
						<switch color='#40a7e7' @change="switchChange($event,'keepscreenon')" :checked='keepscreenon'>
						</switch>
					</view>
				</view>
			</view>

			<!-- 查看系统信息 -->
			<view class="t">
				<view class='title'>
					<view>系统信息</view>
				</view>
				<view class='content'>
					<view class='item' @click.stop='getsysteminfo'>
						<view>
							<view>查看系统信息</view>
						</view>
						<image class='more' src='../../static/images/arrow.png'></image>
					</view>
				</view>
			</view>

			<!-- 清除数据 -->
			<view class='t'>
				<view class='title'>
					<view>清除数据</view>
				</view>
				<view class='content'>
					<view class='item' @click='removeStorage' data-type='setting'>
						<view>
							<view>恢复初始化设置</view>
							<view class='tip'>
								<image src='../../static/images/danger.png'></image>
								<text>所有设置信息都将被清除</text>
							</view>
						</view>
						<image class='more' src='../../static/images/arrow.png'></image>
					</view>
					<view class='item' @click='removeStorage' data-type='all'>
						<view>
							<view>清除所有本地数据</view>
							<view class='tip'>
								<image src='../../static/images/danger.png'></image>
								<text>所有本地数据都将被清除</text>
							</view>
						</view>
						<image class='more' src='../../static/images/arrow.png'></image>
					</view>
				</view>
			</view>

			<!-- 联系开发者 -->
			<view class="t">
				<view class='title'>
					<view>反馈问题</view>
				</view>
				<view class='content'>
					<view class='item'>
						<view>
							<image src='../../static/images/email.png' class="contactImg"></image>
							<view class="contactTxt">邮箱：wangzhengny@163.com</view>
						</view>
					</view>
					<view class='item'>
						<view>
							<image src='../../static/images/wx.png' class="contactImg"></image>
							<view class="contactTxt">微信：19919970402</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 检查更新提示框 -->
		<view class='toast' v-if='show'>
			<view class='mask' catchtap='hide'></view>
			<view class='wrapper'>
				<view class='box'>
					<view class='t'>兼容性</view>
					<view class='content'>由于小程序基础库从 1.9.90 开始支持 wx.getUpdateManager API，故基础库低于该版本的会忽略该设置。</view>
					<view class='t'>启动机制</view>
					<view class='content'>小程序启动会有两种情况，一种是「冷启动」，一种是「热启动」。
						假如用户已经打开过某小程序，然后在一定时间内再次打开该小程序，此时无需重新启动，只需将后台的小程序切换到前台，这个过程就是热启动；冷启动指的是用户首次打开或小程序被微信主动销毁后再次打开的情况，此时小程序需要重新加载启动。
					</view>
					<view class='t'>更新机制</view>
					<view class='content'>小程序冷启动时如果发现有新版本，将会异步下载新版本的代码包，并同时用客户端本地的包进行启动，即新版本的小程序需要等下一次冷启动才会应用上。</view>
					<view class='t'>运行机制</view>
					<view class='content'>
						<text>1、小程序没有重启的概念；</text>
						<text>2、当小程序进入后台，客户端会维持一段时间的运行状态，超过一定时间后（目前是5分钟）会被微信主动销毁；</text>
						<text>3、当短时间内（5s）连续收到两次以上系统内存告警，会进行小程序的销毁。</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cmpVersion
	} from "../../utils/utils.js"
	export default {
		data() {
			return {
				setting: {},
				show: false,
				screenBrightness: '获取中',
				keepscreenon: false,
				SDKVersion: '',
				enableUpdate: true,
				indexPageFn: {},
			}
		},
		// 小程序初始化完成 页面显示
		onShow() {
			let pages = getCurrentPages()
			let len = pages.length
			let indexPage = pages[len - 2]
			// 不能初始化到 data 里面！！！！
			this.keepscreenon = getApp().globalData.keepscreenon;
			this.indexPageFn = {
				reloadInitSetting: indexPage.$vm.reloadInitSetting
			}

			this.ifDisableUpdate()
			this.getScreenBrightness()
			uni.getStorage({
				key: 'setting',
				success: (res) => {
					let setting = res.data
					this.setting = setting
				},
				fail: (res) => {
					this.setting = {}
				},
			})
		},
		methods: {
			switchChange(e, type) {
				console.log(e, type);
				let setting = this.setting
				if (type === 'forceUpdate') {
					if (this.enableUpdate) {
						console.log(1);
						setting[type] = (e.detail || {}).value
					} else {
						console.log(2);
						setting[type] = false
						uni.showToast({
							title: '基础库版本较低，无法使用该功能',
							icon: 'none',
							duration: 2000,
						})
					}
				} else if (type === 'keepscreenon') {
					this.setKeepScreenOn(!this.keepscreenon)
					getApp().globalData.keepscreenon = !this.keepscreenon
				} else {
					setting[type] = !(e.detail || {}).value
				}
				this.setting = setting
				uni.setStorage({
					key: 'setting',
					data: setting,
					success: () => {
						this.indexPageFn.reloadInitSetting()
					},
				})
			},

			// 隐藏更新提示框
			hide() {
				this.show = false
			},

			// 打开更新提示框
			updateInstruc() {
				this.show = true
			},

			ifDisableUpdate() {
				let systeminfo = getApp().globalData.systeminfo
				let SDKVersion = systeminfo.SDKVersion
				let version = cmpVersion(SDKVersion, '1.9.90')
				if (version >= 0) {
					this.SDKVersion = SDKVersion;
					this.enableUpdate = true;
				} else {
					this.SDKVersion = SDKVersion;
					this.enableUpdate = false
				}
			},

			// 检测是否支持NFC
			getHCEState() {
				uni.showLoading({
					title: '检测中...',
				})
				uni.getHCEState({
					success: function(res) {
						uni.hideLoading()
						uni.showModal({
							title: '检测结果',
							content: '该设备支持NFC功能',
							showCancel: false,
							confirmText: '知道了',
							confirmColor: '#40a7e7',
						})
					},
					fail: function(res) {
						uni.hideLoading()
						uni.showModal({
							title: '检测结果',
							content: '该设备不支持NFC功能',
							showCancel: false,
							confirmText: '知道了',
							confirmColor: '#40a7e7',
						})
					},
				})
			},


			// 获取当前屏幕亮度
			getScreenBrightness() {
				uni.getScreenBrightness({
					success: (res) => {
						this.screenBrightness = Number(res.value * 100).toFixed(0)
					},
					fail: (res) => {
						this.screenBrightness = '获取失败'
					},
				})
			},

			// 获取用户设置的屏幕亮度值
			screenBrightnessChanging(e) {
				this.setScreenBrightness(e.detail.value)
			},

			// 设置屏幕亮度
			setScreenBrightness(val) {
				uni.setScreenBrightness({
					value: val / 100,
					success: (res) => {
						this.screenBrightness = val
					},
				})
			},

			// 屏幕常亮
			setKeepScreenOn(b) {
				uni.setKeepScreenOn({
					keepScreenOn: b,
					success: () => {
						this.keepscreenon = b
					},
				})
			},

			// 跳到系统信息页
			getsysteminfo() {
				uni.navigateTo({
					url: '/pages/Systeminfo/Systeminfo',
				})
			},

			// 清除数据
			removeStorage(e) {
				let that = this
				let datatype = e.currentTarget.dataset.type
				if (datatype === 'setting') {
					uni.showModal({
						title: '提示',
						content: '确认要初始化设置',
						cancelText: '取消',
						confirmColor: '#40a7e7',
						success: (res) => {
							if (res.confirm) {
								uni.removeStorage({
									key: 'setting',
									success: function(res) {
										uni.showToast({
											title: '设置已初始化',
										})
										that.setting = {}
										that.indexPage.reloadInitSetting()
									},
								})
							}
						},
					})
				} else if (datatype === 'all') {
					uni.showModal({
						title: '提示',
						content: '确认要删除',
						cancelText: '取消',
						confirmColor: '#40a7e7',
						success(res) {
							if (res.confirm) {
								uni.clearStorage({
									success: (res) => {
										uni.showToast({
											title: '数据已清除',
										})

										that.setting = {}
										that.pos = {}

										that.indexPage.reloadInitSetting()
									},
								})
							}
						},
					})
				}
			},
		}
	}
</script>

<style>
	.setting {
		font-size: 28rpx;
		color: #666;
		/* background: #C0C0C0; */
	}

	.more {
		width: 32rpx;
		height: 32rpx;
	}

	.item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
	}

	.sub.content .item {
		padding-left: 20rpx;
	}

	.item .right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.item .tip {
		font-size: 22rpx;
		color: #999;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.item .tip image {
		width: 24rpx;
		height: 24rpx;
		margin-right: 10rpx;
	}

	.item slider {
		width: 100%;
		margin: 0;
	}

	.item .contactImg {
		width: 38rpx;
		height: 34rpx;
		display: inline-block;
		vertical-align: middle;
		margin-right: 10rpx;
	}

	.item .contactTxt {
		display: inline-block;
		vertical-align: middle;
	}

	.title {
		font-size: 32rpx;
		color: #40a7e7;
		margin: 26rpx 0;
	}

	.subtitle {
		font-size: 28rpx;
		color: #40a7e7;
	}

	.toast .mask {
		position: fixed;
		z-index: 9;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		background: rgba(0, 0, 0, .5);
	}

	.toast .wrapper {
		position: fixed;
		z-index: 10;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
		background: #fff;
		font-size: 24rpx;
		color: #333;
		width: 60%;
		height: 400rpx;
		border-radius: 14rpx;
		padding: 46rpx 28rpx;
	}

	.toast .box {
		height: 400rpx;
		overflow: scroll;
	}

	.t {
		overflow: hidden;
		padding: 0 40rpx;
		background: #fff;
		margin-bottom: 20rpx;
	}

	.toast .t {
		font-size: 28rpx;
		color: #40a7e7;
		margin: 20rpx 0;
		padding: 0;
	}

	.toast .content {
		line-height: 1.8em;
		text-align: justify;
	}

	.toast .content text {
		display: block;
		margin-bottom: 10rpx;
	}

	.wx-switch-input {
		width: 84rpx !important;
		height: 43rpx !important;
	}

	.wx-switch-input::before {
		width: 82rpx !important;
		height: 38rpx !important;
	}

	.wx-switch-input::after {
		width: 38rpx !important;
		height: 38rpx !important;
	}
</style>
