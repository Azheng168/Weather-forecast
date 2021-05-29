<template>
	<view :class="['container',isIPhoneX ? 'iphonex-padding' : '']" @click.stop='menuHide'>
		<heartbeat ref='heartbeat' v-if='showHeartbeat'></heartbeat>
		<view class='bcg' v-if='!bcgImg' :style='"background:" + bcgColor'></view>
		<image class='bcg' v-if='bcgImg' :src='bcgImg' mode='aspectFill'></image>
		<!-- 搜索框 -->
		<view class='search' v-if='!setting.hiddenSearch && !bcgImgAreaShow' style='background:rgba(255, 255, 255, 0)'>
			<view class='wrapper'>
				<image src='../../static/images/search.png'></image>
				<input placeholder-class='placeholderClass' confirm-type='search' placeholder='请输入城市名称，快速查询天气情况'
					maxlength='20' @confirm='commitSearch' v-model='searchText' :disabled='!enableSearch'></input>
			</view>
		</view>

		<!-- 更换背景 -->
		<view class='chooseBcg' v-if='bcgImgAreaShow'>
			<view class='top'>
				<view class='bcgs'>
					<view class='border' :class="bcgImgIndex === index ? 'active' : ''"
						v-for='(item,index) in bcgImgList' v-key='index'>
						<image :src='item.src' @click.native.stop='chooseBcg(item,index)'></image>
						<text class="closeBtn" v-if='item.showCloseBtn' @click='removeUploadBcg'>X</text>
					</view>
					<view class="uploadBg" @click="uploadBcg">
						<image src="../../static/images/more.png"></image>
					</view>
				</view>
			</view>
			<view class='close' @click.native.stop='hideBcgImgArea'>
				<image src='../../static/images/up-arrow.png'></image>
			</view>
		</view>

		<view class='content' v-if='!bcgImgAreaShow' :style="{'margin-top':setting.hiddenSearch ? 20 : 40 + 'px'}">
			<view class='info'>
				<view class="userInfo">

					<!-- 用户信息 -->
					<view class='avatarInfo'>
						<open-data class='avatar' type='userAvatarUrl'></open-data>
						<open-data class='name' type='userNickName'></open-data>
					</view>
					<view class="updateTime">
						<!-- 当前位置 -->
						<view class='cityName' @click.native.stop='toCitychoose'>
							<image v-if='located' class='icon' src='../../static/images/location_s_w.png'></image>
							<view class='val'>{{cityDatas.basic.location || '定位中'}}</view>
						</view>
						<view class='message'>{{cityDatas.updateTimeFormat}} 更新</view>
					</view>
				</view>


				<!-- 温度 -->
				<view class='temp num' decode='true'>{{cityDatas.now.tmp || '-'}}<text
						style='font-size:50rpx;position:relative;top:-20px;'>℃</text></view>

				<!-- 天气情况 -->
				<view class="nowCond">{{cityDatas.now.cond_txt || '--'}}</view>
				<view class='weather'>
					<text class="nowWind">{{cityDatas.now.wind_dir || '--'}}</text>
					<text class="nowVis">能见度 {{cityDatas.now.vis}}</text>
				</view>
			</view>

			<!-- 今日天气 -->
			<view class='details'>
				<view class='detail' v-for='(item,index) in detailsDic.key' :key='index'>
					<view>{{detailsDic.val[item]}}</view>
					<view>{{cityDatas.now[item]}}</view>
				</view>
			</view>

			<!-- 7天预报 -->
			<view class='guide' v-if='cityDatas.daily_forecast'>
				<view class='title'>7 天预报</view>
				<scroll-view class='guides' scroll-x="true" enable-flex>
					<view class='item' v-for='(item,index) in cityDatas.daily_forecast' :key='index'>
						<view class='date i'>{{item.date}}</view>
						<view class="day i">{{item.day}}</view>
						<view class='temperature i'>{{item.tmp_max}}~{{item.tmp_min}}℃</view>
						<view class='weather i'>
							<text>{{item.cond_txt_d}}</text>
							<image mode='widthFix' :src='weatherIconUrl+item.cond_code_d+".png"'></image>
						</view>
						<view class='wind i'>{{item.wind_dir}}{{item.wind_sc}}级</view>
					</view>
				</scroll-view>
			</view>
			<!-- 24 小时逐 3 小时预报 -->
			<view class='hourly' v-if='hourlyDatas.length'>
				<view class='title'>24 小时逐 3 小时预报</view>
				<view class='hours'>
					<swiper style='height:360rpx;' duration="300" next-margin="50rpx">
						<view v-for="(item,index) in hourlyDatas" :key="index">
							<swiper-item>
								<view class='hour'>
									<view class='detail'>
										<view>天气</view>
										<view class='weather'>
											<text>{{item.cond_txt}}</text>
										</view>
									</view>
									<view class='detail'>
										<view>温度(℃)</view>
										<view>{{item.tmp}}</view>
									</view>
									<view class='detail'>
										<view>相对湿度(%)</view>
										<view>{{item.hum}}</view>
									</view>
									<view class='detail'>
										<view>露点温度(℃)</view>
										<view>{{item.dew}}</view>
									</view>
									<view class='detail'>
										<view>降水概率</view>
										<view>{{item.pop}}</view>
									</view>
									<view class='detail'>
										<view>风向</view>
										<view>{{item.wind_dir}}</view>
									</view>
									<view class='detail'>
										<view>风向角度(deg)</view>
										<view>{{item.wind_deg}}</view>
									</view>
									<view class='detail'>
										<view>风力(级)</view>
										<view>{{item.wind_sc}}</view>
									</view>
									<view class='detail'>
										<view>风速(mk/h)</view>
										<view>{{item.wind_spd}}</view>
									</view>
									<view class='detail'>
										<view>气压(mb)</view>
										<view>{{item.pres}}</view>
									</view>
									<view class='detail'>
										<view>云量(%)</view>
										<view>{{item.cloud}}</view>
									</view>
								</view>
								<view class='time'>{{item.time}}</view>
							</swiper-item>
						</view>
					</swiper>
				</view>
			</view>



			<!-- 生活指数 -->
			<view class='livingIndex' v-if='!setting.hiddenIndex'>
				<view class='item' v-for='(item,index) in cityDatas.lifestyle' :key='index'>
					<image class='icon' :src='require(`../../static/images/lifestyle_${item.type}.png`) '></image>
					<view class='right'>
						<view class='key'>{{lifestyles[item.type]}} {{item.brf}}</view>
						<view class='value'>{{item.txt}}</view>
					</view>
				</view>
			</view>

			<view v-if='openSettingButtonShow' class='openSettingButton'>
				<image src='../../static/images/unlock.png'></image>
				<button open-type='openSetting'></button>
			</view>

			<!-- 悬浮菜单 -->
			<view class='menus' v-if='!bcgImgAreaShow'>
				<image src="../../static/images/share_circle.png" :animation="animationOne" class="menu"></image>
				<button plain='true' open-type='share' :animation="animationOne" class='menu share'></button>
				<image src="../../static/images/location.png" :animation="animationTwo" class="menu"
					@click.native.stop="menuToCitychoose"></image>
				<image src="../../static/images/changeBg.png" :animation="animationThree" class="menu"
					@click.native.stop="showBcgImgArea"></image>
				<image src="../../static/images/setting.png" :animation="animationFour" class="menu"
					@click.native.stop="menuToSetting">
				</image>
				<image src="http://qiniu.summer.kim/60adb3e14c048.png" :animation="animationMain" class="menu main"
					@click.native.stop="menuMain">
				</image>
			</view>

		</view>
	</view>
</template>

<script>
	import heartbeat from '@/components/heartbeat/heartbeat.vue';
	import {
		cmpVersion,
		isEmptyObject,
		formatDate
	} from "../../utils/utils.js"
	const key = getApp().globalData.key
	export default {
		components: {
			heartbeat
		},
		data() {
			return {
				isIPhoneX: getApp().globalData.isIPhoneX,
				cityDatas: {},
				hourlyDatas: [],
				weatherIconUrl: getApp().globalData.weatherIconUrl,
				detailsDic: {
					key: ['cond_txt', 'tmp', 'fl', 'hum', 'pcpn', 'wind_dir', 'wind_deg', 'wind_sc', 'wind_spd', 'vis',
						'pres',
						'cloud'
					],
					val: {
						cond_txt: '天气',
						tmp: '温度(℃)',
						fl: '体感温度(℃)',
						hum: '相对湿度(%)',
						pcpn: '降水量(mm)',
						wind_dir: '风向',
						wind_deg: '风向角度(deg)',
						wind_sc: '风力(级)',
						wind_spd: '风速(mk/h)',
						vis: '能见度(km)',
						pres: '气压(mb)',
						cloud: '云量(%)',
					},
				},
				lifestyles: {
					'comf': '舒适度指数',
					'cw': '洗车指数',
					'drsg': '穿衣指数',
					'flu': '感冒指数',
					'sport': '运动指数',
					'trav': '旅游指数',
					'uv': '紫外线指数',
					'air': '空气污染扩散条件指数',
					'ac': '空调开启指数',
					'ag': '过敏指数',
					'gl': '太阳镜指数',
					'mu': '化妆指数',
					'airc': '晾晒指数',
					'ptfc': '交通指数',
					'fsh': '钓鱼指数',
					'spi': '防晒指数',
				},
				// 用来清空 input
				searchText: '',
				// 是否已经弹出
				hasPopped: false,
				animationMain: {},
				animationOne: {},
				animationTwo: {},
				animationThree: {},
				animationFour: {},
				// 是否切换了城市
				located: true,
				// 需要查询的城市
				searchCity: '',
				setting: {},
				bcgImgList: [{
						src: '../../static/images/beach-bird-birds-235787.jpg',
						topColor: '#393836'
					},
					{
						src: '../../static/images/clouds-forest-idyllic-417102.jpg',
						topColor: '#0085e5'
					},
					{
						src: '../../static/images/backlit-dawn-dusk-327466.jpg',
						topColor: '#2d2225'
					},
					{
						src: '../../static/images/accomplishment-adventure-clear-sky-585825.jpg',
						topColor: '#004a89'
					},
					{
						src: '../../static/images/fog-himalayas-landscape-38326.jpg',
						topColor: '#b8bab9'
					},
					{
						src: '../../static/images/asphalt-blue-sky-clouds-490411.jpg',
						topColor: '#009ffe'
					},
					{
						src: '../../static/images/aerial-climate-cold-296559.jpg',
						topColor: '#d6d1e6'
					},
					{
						src: '../../static/images/beautiful-cold-dawn-547115.jpg',
						topColor: '#ffa5bc'
					}
				],
				bcgImgIndex: 0,
				bcgImg: '',
				bcgImgAreaShow: false,
				bcgColor: '#2d2225',
				// 粗暴直接：移除后再创建，达到初始化组件的作用
				showHeartbeat: true,
				// heartbeat 时禁止搜索，防止动画执行
				enableSearch: true,
				openSettingButtonShow: false,
				shareInfo: {},
			}
		},
		onLoad() {
			if (!isEmptyObject(this.shareInfo)) {
				return
			}
			this.reloadPage()
		},
		// 监听用户下拉
		onPullDownRefresh(res) {
			this.reloadPage()
		},
		methods: {
			// 页面加载
			reloadPage() {
				this.setBcgImg()
				this.getCityDatas()
				this.reloadInitSetting()
				this.reloadWeather()
			},
			// 处理成功获取的天气数据
			success(data, location) {
				this.openSettingButtonShow = false
				this.searchCity = location
				uni.stopPullDownRefresh()
				let now = new Date()
				// 存下来源数据
				data.updateTime = now.getTime()
				data.updateTimeFormat = formatDate(now, "MM-dd hh:mm")
				let day1s = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
				let days2 = ['今天', '明天', '后天']
				data.daily_forecast = data.daily_forecast.map((item, index) => {
					let dayIndex = new Date(item.date).getDay()
					return {
						...item,
						day: index == 0 || index == 1 || index == 2 ? days2[index] : day1s[dayIndex]
					}
				})
				uni.setStorage({
					key: 'cityDatas',
					data
				})
				this.cityDatas = data

			},

			// 获取数据失败处理
			fail(res) {
				uni.stopPullDownRefresh()
				let errMsg = res.errMsg || ''
				// 拒绝授权地理位置权限
				if (errMsg.indexOf('deny') !== -1 || errMsg.indexOf('denied') !== -1) {
					uni.showToast({
						title: '需要开启地理位置权限',
						icon: 'none',
						duration: 2500,
						success: (res) => {
							if (this.canUseOpenSettingApi()) {
								let timer = setTimeout(() => {
									clearTimeout(timer)
									uni.openSetting({})
								}, 2500)
							} else {
								this.setData({
									openSettingButtonShow: true,
								})
							}
						},
					})
				} else {
					uni.showToast({
						title: '网络不给力，请稍后再试',
						icon: 'none',
					})
				}
			},

			// 获取搜索框内容
			commitSearch(res) {
				this.search(this.searchText)
			},
			// 心跳特效
			dance() {
				this.enableSearch = false;
				let heartbeat = this.$refs.heartbeat;
				heartbeat.dance(() => {
					this.showHeartbeat = false;
					this.enableSearch = true;
					let end = setTimeout(() => {
						this.showHeartbeat = true;
						clearTimeout(end)
					}, 500)
				})
			},

			// 清空输入框
			clearInput() {
				this.searchText = '';
			},

			// 搜索城市查询天气（输入520有惊喜）
			search(val, callback) {
				if (val === '520' || val === '521') {
					this.clearInput()
					this.dance()
					return
				}
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300,
				})
				if (val) {
					this.located = false
					this.getWeather(val)
					this.getHourly(val)
				}
				callback && callback()
			},

			// wx.openSetting 要废弃，button open-type openSetting 2.0.7 后支持
			// 使用 wx.canIUse('openSetting') 都会返回 true，这里判断版本号区分
			canUseOpenSettingApi() {
				let systeminfo = getApp().globalData.systeminfo
				let SDKVersion = systeminfo.SDKVersion
				let version = cmpVersion(SDKVersion, '2.0.7')
				if (version < 0) {
					return true
				} else {
					return false
				}
			},

			// 获取当前定位的天气情况
			init(params, callback) {
				this.located = true;
				uni.getLocation({
					type: 'wgs84',
					success: (res) => {
						this.getWeather(`${res.latitude},${res.longitude}`)
						this.getHourly(`${res.latitude},${res.longitude}`)
						callback && callback()
					},
					fail: (res) => {
						console.log(res);
						this.fail(res)
					}
				})
			},


			// 获取天气接口数据
			getWeather(location) {
				uni.request({
					url: `${getApp().globalData.requestUrl.weather}`,
					data: {
						location,
						key,
					},
					success: (res) => {
						if (res.statusCode === 200) {
							let data = res.data.HeWeather6[0]
							if (data.status === 'ok') {
								this.clearInput()
								this.success(data, location)
							} else {
								uni.showToast({
									title: '查询失败',
									icon: 'none',
								})
							}
						}
					},
					fail: () => {
						uni.showToast({
							title: '查询失败',
							icon: 'none',
						})
					},
				})
			},



			// 获取24小时逐3小时预报
			getHourly(location) {
				uni.request({
					url: `${getApp().globalData.requestUrl.hourly}`,
					data: {
						location,
						key,
					},
					success: (res) => {
						if (res.statusCode === 200) {

							let data = res.data.HeWeather6[0]
							if (data.status === 'ok') {
								this.hourlyDatas = data.hourly || []
							}
						}
					},
					fail: () => {
						uni.showToast({
							title: '查询失败',
							icon: 'none',
						})
					},
				})
			},

			// 获取store存放的天气数据
			getCityDatas() {
				uni.getStorage({
					key: 'cityDatas',
					success: (res) => {
						this.cityDatas = res.data
					}
				})
			},

			// 设置背景
			setBcgImg(index) {
				if (index !== undefined) {
					this.bcgImgIndex = index,
						this.bcgImg = this.bcgImgList[index].src,
						this.bcgColor = this.bcgImgList[index].topColor,
						this.setNavigationBarColor()
					return
				}

				uni.getStorage({
					key: 'bcgImgIndex',
					success: (res) => {
						let bcgImgIndex = res.data || 0
						let length = this.bcgImgList.length

						this.bcgImgIndex = bcgImgIndex;
						this.bcgImg = bcgImgIndex > length - 1 ? this.bcgImgList[0].src : this
							.bcgImgList[bcgImgIndex].src;
						this.bcgColor = bcgImgIndex > length - 1 ? this.bcgImgList[0].topColor : this
							.bcgImgList[bcgImgIndex].topColor;

						this.setNavigationBarColor()
					},
					fail: () => {
						this.bcgImgIndex = 0;
						this.bcgImg = this.bcgImgList[0].src;
						this.bcgColor = this.bcgImgList[0].topColor;

						this.setNavigationBarColor()
					},
				})
			},


			// 设置导航栏颜色
			setNavigationBarColor(color) {
				let bcgColor = color || this.bcgColor
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: this.bcgColor,
				})
			},

			reloadWeather() {
				if (this.located) {
					this.init({})
				} else {
					this.search(this.searchCity)
					this.searchCity = '';

				}
			},

			// 检查更新
			checkUpdate(setting) {
				// 兼容低版本
				if (!setting.forceUpdate || !uni.getUpdateManager) {
					return
				}
				let updateManager = uni.getUpdateManager()
				updateManager.onCheckForUpdate((res) => {
					console.error(res)
				})
				updateManager.onUpdateReady(function() {
					uni.showModal({
						title: '更新提示',
						content: '新版本已下载完成，是否重启应用？',
						success: function(res) {
							if (res.confirm) {
								updateManager.applyUpdate()
							}
						}
					})
				})
			},

			// 显示更换背景功能
			showBcgImgArea() {
				uni.setNavigationBarTitle({
					title: '更换背景'
				})

				this.bcgImgAreaShow = true;

			},

			// 隐藏更换背景功能
			hideBcgImgArea() {
				uni.setNavigationBarTitle({
					title: '查询天气'
				})
				this.bcgImgAreaShow = false

			},

			// 获取当前选中的图片数据
			chooseBcg(item, index) {
				let src = item.src
				this.setBcgImg(index)
				uni.setStorage({
					key: 'bcgImgIndex',
					data: index
				})
			},

			// 上传本地图片做背景
			uploadBcg() {
				var _this = this;
				uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function(res) {
						let bcgImgList = _this.bcgImgList
						bcgImgList.push({
							src: res.tempFilePaths[0],
							topColor: '#000',
							showCloseBtn: true
						})
						_this.bcgImgList = bcgImgList
						let index = _this.bcgImgList.length - 1
						_this.setBcgImg(index)
						uni.setStorage({
							key: 'bcgImgIndex',
							data: index,
						})
					}
				})
			},

			// 删除上传的图片
			removeUploadBcg() {
				let bcgImgList = this.bcgImgList
				bcgImgList.pop()
				this.bcgImgList = bcgImgList
				let index = this.bcgImgList.length - 1
				this.setBcgImg(index)
				uni.setStorage({
					key: 'bcgImgIndex',
					data: index,
				})
			},

			// 跳到选择城市页面
			toCitychoose() {
				uni.navigateTo({
					url: '/pages/Citychoose/Citychoose',
				})
			},

			initSetting(successFunc) {
				uni.getStorage({
					key: 'setting',
					success: (res) => {
						let setting = res.data || {}
						this.setting = setting
						successFunc && successFunc(setting)
					},
					fail: () => {
						this.setting = {}
					},
				})
			},

			reloadInitSetting() {
				this.initSetting((setting) => {
					this.checkUpdate(setting)
				})
			},

			// 分享
			onShareAppMessage(res) {
				let shareInfo = this.shareInfo
				return {
					title: shareInfo.title || '天气查询',
					path: shareInfo.path || '/pages/Index/Index',
					imageUrl: shareInfo.imageUrl,
				}
			},

			menuHide() {
				if (this.hasPopped) {
					this.takeback()
					this.hasPopped = false;
				}
			},

			// 展开/收起功能按钮
			menuMain() {
				if (!this.hasPopped) {
					this.popp()
					this.hasPopped = true
				} else {
					this.takeback()
					this.hasPopped = false
				}
			},

			// 跳到选择城市页面
			menuToCitychoose() {
				this.menuMain()
				uni.navigateTo({
					url: '/pages/Citychoose/Citychoose',
				})
			},

			// 跳到设置页面
			menuToSetting() {
				this.menuMain()
				uni.navigateTo({
					url: '/pages/Settings/Settings',
				})
			},

			// 按钮弹出动画
			popp() {
				let animationMain = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease-out'
				})
				let animationOne = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease-out'
				})
				let animationTwo = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease-out'
				})
				let animationThree = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease-out'
				})
				let animationFour = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease-out'
				})
				animationMain.rotateZ(180).step()
				animationOne.translate(0, -60).rotateZ(360).opacity(1).step()
				animationTwo.translate(-Math.sqrt(3600 - 400), -30).rotateZ(360).opacity(1).step()
				animationThree.translate(-Math.sqrt(3600 - 400), 30).rotateZ(360).opacity(1).step()
				animationFour.translate(0, 60).rotateZ(360).opacity(1).step()

				this.animationMain = animationMain.export()
				this.animationOne = animationOne.export()
				this.animationTwo = animationTwo.export()
				this.animationThree = animationThree.export()
				this.animationFour = animationFour.export()

			},

			// 按钮收回动画
			takeback() {
				let animationMain = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease-out'
				})
				let animationOne = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease-out'
				})
				let animationTwo = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease-out'
				})
				let animationThree = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease-out'
				})
				let animationFour = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease-out'
				})
				animationMain.rotateZ(0).step();
				animationOne.translate(0, 0).rotateZ(0).opacity(0).step()
				animationTwo.translate(0, 0).rotateZ(0).opacity(0).step()
				animationThree.translate(0, 0).rotateZ(0).opacity(0).step()
				animationFour.translate(0, 0).rotateZ(0).opacity(0).step()

				this.animationMain = animationMain.export()
				this.animationOne = animationOne.export()
				this.animationTwo = animationTwo.export()
				this.animationThree = animationThree.export()
				this.animationFour = animationFour.export()

			},

		}
	}
</script>

<style lang="scss">
	.num {
		font-weight: 300;
	}

	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		color: #fff;
		font-size: 30rpx;

		.bcg {
			position: fixed;
			z-index: 2;
			height: 100%;
			width: 100%;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}

		// 搜索
		.search {
			position: fixed;
			z-index: 4;
			top: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 90rpx;

			.wrapper {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				font-size: 28rpx;
				height: 60rpx;
				margin: 15rpx 50rpx;
				padding: 0 15rpx;
				box-sizing: border-box;
				border: none;
				background: rgba(0, 0, 0, .3);
				border-radius: 20px;
			}

			image {
				width: 28rpx;
				height: 28rpx;
				margin-right: 16rpx;
			}

			input {
				flex: 1;
			}

			.placeholderClass {
				color: #fff;
			}
		}

		// 更换背景
		.chooseBcg {
			display: flex;
			flex-direction: column;
			min-height: 100vh;
			position: fixed;
			z-index: 100;
			top: 0;
			left: 0;
			right: 0;
			width: 100%;
			font-size: 24rpx;
			color: #333;

			.top {
				box-sizing: border-box;
				padding: 20rpx 20rpx 50rpx;
				background: rgba(255, 255, 255, 0);
				color: #fff;

				.bcgs {
					display: flex;
					align-items: center;
					margin-top: 20rpx;
					overflow: scroll;

					.border {
						padding: 1rpx;
						margin-right: 18rpx;
						border: 1rpx solid rgba(255, 255, 255, 0);
						transition: .1s ease;
						position: relative;

						image {
							width: 110rpx;
							height: 190rpx;
							display: block;
						}

						.closeBtn {
							font-size: 26rpx;
							position: absolute;
							right: 4rpx;
							display: inline-block;
							background: rgba(0, 0, 0, .7);
							height: 36rpx;
							width: 36rpx;
							line-height: 36rpx;
							text-align: center;
						}
					}

					.active {
						border: 1rpx solid #40a7e7;
						transition: .1s ease;
					}

					.uploadBg {
						image {
							width: 130rpx;
							height: 130rpx;
						}
					}
				}
			}

			.close {
				flex: 1;
				background: rgba(0, 0, 0, 0);
				padding: 20rpx 0;
				text-align: center;
				
				image {
					width: 64rpx;
					height: 64rpx;
				}
			}
		}
	
		// 内容区 
		.content {
			flex: 2;
			transition: .3s ease;
			position: relative;
			z-index: 2;
		}
		
	}







	.info {
		padding: 10rpx 0 50rpx;
	}

	.updateTime {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.info .userInfo {
		padding: 0 16px;
	}

	.info .userInfo .avatarInfo {
		display: flex;
		align-items: center;
	}

	.info .userInfo .avatarInfo .avatar {
		display: block;
		overflow: hidden;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}

	.info .userInfo .avatarInfo .name {
		padding: 0 10rpx;
		font-size: 34rpx;
	}

	.info .userInfo .avatarInfo .downArrow {
		width: 24rpx;
		height: 24rpx;
	}


	.info .userInfo .cityName {
		display: flex;
		// justify-content: center;
		align-items: center;
	}

	.info .userInfo .cityName .val {
		font-size: 58rpx;
		max-width: 5em;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		margin-left: 10rpx;
	}

	.info .userInfo .cityName .icon,
	.info .userInfo .cityName .down {
		width: 28rpx;
		height: 28rpx;
	}

	.info .userInfo .cityName .icon {
		margin-right: 10rpx;
	}

	.info .userInfo .cityName .down {
		margin-left: 10rpx;
	}

	.info .temp,
	.info .pm,
	.info .pm view,
	.info.nowCond,
	.info .weather {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.info .nowCond {
		text-align: center;
		font-size: 38rpx;
		padding: 10px 0;

	}

	.info .weather {
		margin-bottom: 30rpx;
	}

	.info .weather .nowWind,
	.info .weather .nowVis {
		font-size: 30rpx;
		height: 1em;
		line-height: 1em;
		border-radius: 25rpx;
		padding: 10rpx 20rpx;
		border: 1px solid rgba(240, 240, 240, .8);
		background: rgba(240, 240, 240, .1);
	}

	.info .weather .nowWind {
		border-radius: 25rpx 0 0 25rpx;
	}

	.info .weather .nowVis {
		border-radius: 0 25rpx 25rpx 0;
		border-left: none;
	}

	.info .pm text {
		font-size: 24rpx;
		height: 1em;
		line-height: 1em;
		padding: 10rpx 20rpx;
		border-radius: 20rpx;
		background: rgba(240, 240, 240, .2);
	}

	.city {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		padding: 0 50rpx;
		font-size: 66rpx;
	}


	.message {
		font-size: 22rpx;
		color: #ccc;
		// padding: 30rpx 50rpx 0;
		// width:100%;
		// height:100%;
		// box-sizing: border-box;
	}

	.temp {
		height: 340rpx;
		font-size: 200rpx;
	}

	.guide .guides {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		font-size: 24rpx;
		padding-top: 20rpx;
		/* border-bottom: 1rpx solid rgba(240, 240, 240, .4); */
		background: rgba(0, 0, 0, .6);
		margin-bottom: 20rpx;
	}

	.guide .title,
	.hourly .title {
		border-bottom: 1rpx solid rgba(250, 250, 250, .2);
		background: rgba(0, 0, 0, .6);
		font-size: 24rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		display: none;
	}

	.guide .item {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 170rpx;
		flex-shrink: 0;
	}

	.guide image {
		width: 44rpx;
	}

	.guide .i {
		padding-bottom: 20rpx;
	}

	.guide .i.weather,
	.hour .weather {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.guide .i image,
	.hour .weather image {
		width: 40rpx;
		margin-left: 4rpx;
	}

	.hourly {
		margin-bottom: 20rpx;
	}

	.hourly .hours {
		padding: 20rpx 10rpx 0;
		background: rgba(0, 0, 0, .6);
	}

	.hourly .hours .time {
		font-size: 22rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
	}

	.details {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		background: rgba(0, 0, 0, .6);
		margin-bottom: 20rpx;
		font-size: 24rpx;
	}

	.hour {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		background: rgb(107, 102, 102);
		font-size: 24rpx;
		box-sizing: border-box;
		border-radius: 8rpx;
	}

	.hourly swiper-item {
		box-sizing: border-box;
		padding: 0 10rpx;
		background: rgba(0, 0, 0, 0);
	}

	.details .detail,
	.hour .detail {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding: 10rpx 0;
		height: 100rpx;
		width: 25%;
		border-right: 1rpx solid rgba(250, 250, 250, 0.2);
		border-bottom: 1rpx solid rgba(250, 250, 250, 0.2);
		box-sizing: border-box;
	}

	.details .detail:nth-child(4n),
	.hour .detail:nth-child(4n) {
		border-right: none;
	}

	.details .detail:nth-child(n+9),
	.hour .detail:nth-child(n+9) {
		border-bottom: none;
	}

	.livingIndex {
		/* border-bottom: 1rpx solid rgba(240, 240, 240, .4); */
		background: rgba(0, 0, 0, .6);
		margin-bottom: 20rpx;
	}

	.livingIndex .item {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1rpx solid rgba(250, 250, 250, .2);
		padding: 20rpx 0;
		margin: 0 30rpx;
	}

	.livingIndex .item:last-child {
		border-bottom: none;
	}

	.livingIndex .item .right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		flex: 1;
	}

	.livingIndex .item .value {
		margin-top: 10rpx;
		font-size: 24rpx;
	}

	.livingIndex .icon {
		width: 80rpx;
		height: 80rpx;
		padding: 0 24rpx;
	}

	.menus .menu,
	.menus .share {
		height: 40px;
		width: 40px;
		border-radius: 50%;
		position: fixed;
		z-index: 100;
		bottom: 150rpx;
		right: 70rpx;
		opacity: 0;
	}

	.menus .share {
		background: rgba(0, 0, 0, 0);
	}

	.menus .main {
		opacity: 1;
	}

	/* 打开设置页面 button */
	.openSettingButton {
		position: fixed;
		z-index: 102;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .5);
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.openSettingButton image {
		position: relative;
		width: 128rpx;
		height: 128rpx;
		z-index: 2;
	}

	.openSettingButton button {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		opacity: 0;
		z-index: 3;
	}

	.footer {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 60rpx;
		font-size: 22rpx;
		color: #fff;
	}
</style>
