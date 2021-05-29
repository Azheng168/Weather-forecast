<template>
	<view class='container'>
		<!-- 搜索 -->
		<view class="wrapper">
			<view class='search'>
				<view class="inner">
					<image class='icon' src='../../static/images/search_grey.png'></image>
					<input v-model="inputText" placeholder='请输入城市名称，快速查询天气信息' maxlength='20' confirm-type='搜索'
						@confirm='inputFilter' @input='inputFilter' @focus='inputFilter'></input>
				</view>
				<text class='cancel' @click.native.stop='cancel'>取消</text>
			</view>
		</view>
		<!-- 热门城市 -->
		<!-- <view class='top' wx:if='{{hotCities.length}}'>
	    <view class='title'>热门城市</view>
	    <view class='items'>
	      <view class='item' hover-class='hover-ddd' catchtap='choose' data-item='{{item}}' wx:key='index' wx:for='{{hotCities}}'>{{item.name}}</view>
	    </view>
	  </view> -->

		<!-- 定位 -->
		<view class='hot'>
			<view class='title'>猜你想找</view>
			<view class='cities'>
				<view class='item active' @click.native.stop='choose'>
					<image class='icon' src='../../static/images/location_s_w.png'></image>
					<view>定位</view>
				</view>
				<view class='item' hover-class='active' @click.native.stop='choose' v-for="(item,index) in hotCities"
					:key='index'>{{item.name}}</view>
			</view>
		</view>

		<!-- 城市列表 -->
		<view class='bottom'>
			<view v-for="(item,index) in showItems" :key='index'>
				<view class='key'>{{index}}</view>
				<view class='values'>
					<view class='value' hover-class='hover' v-for='(v,i) in item' :key="i"
						@click.native.stop='choose(v)'>{{v.name}}</view>
				</view>
			</view>
		</view>
		<!-- 索引栏 -->
		<!-- <van-index-bar :sticky="false">
			<view v-for="(item,index) in showItems" :key='index'>
				<van-index-anchor :index="index">{{index}}</van-index-anchor>
				<van-cell v-for='(v,i) in item' :key="i" :title="v.name" @click.native.stop='choose(v)' />
			</view>
		</van-index-bar> -->
		<view class='empty' v-if='!showItems'>暂无城市可以选择</view>
	</view>
</template>

<script>
	import {
		cities as staticCities
	} from '../../static/data/staticData.js'
	import {
		cmpVersion,
		isEmptyObject,
		formatDate
	} from "../../utils/utils.js"
	export default {
		data() {
			return {
				isEmptyObject,
				staticCities,
				alternative: null,
				cities: [],
				// 需要显示的城市
				showItems: null,
				inputText: '',
				hotCities: [],
			}
		},
		// 获取静态城市数据
		onLoad() {
			// this.getHotCities()
			let cities = this.getSortedAreaObj(staticCities || []);
			this.cities = cities;
			this.showItems = cities;
			console.log(this.showItems);
		},
		methods: {
			// 清空
			cancel() {
				this.inputText = '';
				this.showItems = this.cities;
			},

			// 输入框搜索
			inputFilter(e) {
				let alternative = {}
				let cities = this.cities
				let value = this.inputText.replace(/\s+/g, '')
				if (value.length) {
					for (let i in cities) {
						let items = cities[i]
						for (let j = 0, len = items.length; j < len; j++) {
							let item = items[j]
							if (item.name.indexOf(value) !== -1) {
								if (isEmptyObject(alternative[i])) {
									alternative[i] = []
								}
								alternative[i].push(item)
							}
						}
					}
					if (isEmptyObject(alternative)) {
						alternative = null
					}
					this.alternative = alternative;
					this.showItems = alternative

				} else {
					this.alternative = null;
					this.showItems = cities;
				}
			},

			// 按照字母顺序生成需要的数据格式
			getSortedAreaObj(areas) {
				areas = areas.sort((a, b) => {
					if (a.letter > b.letter) {
						return 1
					}
					if (a.letter < b.letter) {
						return -1
					}
					return 0
				})
				let obj = {}
				for (let i = 0, len = areas.length; i < len; i++) {
					let item = areas[i]
					delete item.districts
					let letter = item.letter
					if (!obj[letter]) {
						obj[letter] = []
					}
					obj[letter].push(item)
				}
				// 返回一个对象，直接用 wx:for 来遍历对象，index 为 key，item 为 value，item 是一个数组
				return obj;
			},

			// 搜索选择的城市
			choose(item) {
				let name = item.name;
				let pages = getCurrentPages();
				let len = pages.length;
				let indexPage = pages[len - 2];
				if (name) {
					indexPage.$vm.search(name, () => {
						uni.navigateBack({})
					})
				} else {
					indexPage.$vm.init({}, () => {
						uni.navigateBack({})
					})
				}
			},

			// 获取热门城市
			// getHotCities(callback) {
			// 	wx.cloud.callFunction({
			// 			name: 'getHotCities',
			// 			data: {},
			// 		})
			// 		.then(res => {
			// 			let data = res.result.data
			// 			if (data) {
			// 					this.hotCities= data;
			// 			}
			// 		})
			// },
		}
	}
</script>

<style>
	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
	}

	/deep/.van-index-bar__index {
		margin-bottom: 6rpx;
	}

	.wrapper {
		font-size: 0;
		background: #fff;
		padding: 30rpx;
		position: relative;
		height: 128rpx;
		box-sizing: border-box;
	}

	.wrapper .search {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.inner {
		background: #f4f6f9;
		font-size: 30rpx;
		padding: 16rpx 0 16rpx 20rpx;
		box-sizing: border-box;
		border-radius: 8rpx;
		flex: 1;
		display: flex;
		align-items: center;
	}

	.inner input {
		background: #f4f6f9;
		font-size: 30rpx;
		height: 38rpx;
		/* 覆盖默认样式 min-height */
		min-height: 38rpx;
		line-height: 38rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.icon {
		width: 28rpx;
		height: 28rpx;
		margin-right: 10rpx;
	}

	.cancel {
		font-size: 30rpx;
		display: inline-block;
		color: #666;
		width: 2.5em;
		text-align: right;
	}

	.items {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.items .item {
		border: 1rpx solid rgb(242, 242, 242);
		background: #efefef;
		border-radius: 10rpx;
		padding: 8rpx 40rpx;
		margin-right: 30rpx;
		margin-bottom: 36rpx;
	}

	.top .title {
		margin-bottom: 30rpx;
	}

	.top {
		padding: 30rpx 96rpx 20rpx 30rpx;
	}

	.top,
	.bottom {
		font-size: 32rpx;
		color: #333;
		background: #fff;
	}

	.hot {
		background: #fff;
		margin-top: 10rpx;
		padding: 30rpx 30rpx 20rpx;
	}

	.hot .title {
		font-size: 32rpx;
	}

	.hot .cities {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.hot .item {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 25%;
		height: 60rpx;
		background: #f4f6f9;
		border-radius: 8rpx;
		color: #333;
		font-size: 28rpx;
		margin-top: 20rpx;
		margin-left: 2.5%;
		margin-right: 2.5%;
	}

	.hot .item .icon {
		width: 24rpx;
		height: 24rpx;
		margin-right: 8rpx;
	}

	.hot .item.active {
		background: #40a7e7;
		color: #fff;
	}

	.hot .item:nth-child(3n+1) {
		margin-left: 0;
	}

	.hot .item:nth-child(3n) {
		margin-right: 0;
	}

	.bottom .key {
		background: #f4f6f9;
		height: 50rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
	}

	.bottom .values .value {
		border-bottom: 1rpx solid #efefef;
		height: 104rpx;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
	}

	.bottom .values .value:last-child {
		border-bottom: none;
	}

	.hover {
		background: #f4f6f9;
	}

	.empty {
		margin-top: 100rpx;
		font-size: 30rpx;
		text-align: center;
		color: #666;
	}
</style>
