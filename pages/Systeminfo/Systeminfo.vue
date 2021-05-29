<template>
	<view class='systeminfo'>
		<view class='brand'>
			<image src='../../static/images/mobile.png'></image>
			<text>{{systeminfoObj.brand}}</text>
		</view>
		<view class='item' v-for='(item,index) in systeminfoArr' :key='index'>
			<view class='key'>{{item.name}}</view>
			<view class='value'>{{systeminfoObj[item.key]}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				systeminfoObj: {},
				systeminfoArr: [{
						key: 'brand',
						name: '手机品牌',
					},
					{
						key: 'model',
						name: '手机型号',
					},
					{
						key: 'pixelRatio',
						name: '设备像素比',
					},
					{
						key: 'screenWidth',
						name: '屏幕宽度',
					},
					{
						key: 'screenHeight',
						name: '屏幕高度',
					},
					{
						key: 'windowWidth',
						name: '可使用窗口宽度',
					},
					{
						key: 'windowHeight',
						name: '可使用窗口高度',
					},
					{
						key: 'statusBarHeight',
						name: '状态栏高度',
					},
					{
						key: 'language',
						name: '微信设置的语言',
					},
					{
						key: 'version',
						name: '微信版本号',
					},
					{
						key: 'system',
						name: '操作系统版本',
					},
					{
						key: 'platform',
						name: '客户端平台',
					},
					{
						key: 'fontSizeSetting',
						name: '用户字体大小设置(px)',
					},
					{
						key: 'SDKVersion',
						name: '客户端基础库版本',
					},
				],
			}
		},
		onShow() {
			this.systeminfoObj = getApp().globalData.systeminfo
		},
		methods: {

		}
	}
</script>

<style>
	.systeminfo {
		padding: 0 30rpx 0 30rpx;
		background: #fff;
		margin-bottom: 20rpx;
	}

	.brand {
		font-family: DINCondensed-Bold;
		height: 300rpx;
		font-size: 100rpx;
		color: #40a7e7;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.brand image {
		width: 100rpx;
		height: 100rpx;
		margin-right: 20rpx;
	}

	.brand text {
		line-height: 1em;
	}

	.systeminfo .item {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		font-size: 30rpx;
		color: #000;
		padding: 30rpx 15rpx;
		height: 62rpx;
		border-top: 1rpx solid #efefef;
	}

	.systeminfo .item:last-child {
		border-bottom: none;
	}

	.systeminfo .item .key {
		line-height: 1em;
	}

	.systeminfo .item .value {
		font-size: 24rpx;
		line-height: 1em;
		color: #777;
	}
</style>
