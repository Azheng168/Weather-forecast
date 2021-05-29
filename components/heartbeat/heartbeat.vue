<template>
	<view>
		<image v-for='(item , index) in arr' :key='index' :animation='animations[index]' class='heart' :style='
			"left:"+lefts[index]+"px;" +
			"top:"+tops[index]+"px;" +
			"width:"+widths[index]+"rpx;" +
			"height:"+widths[index]+"rpx;"' src="../../static/images/heartbeat.png"></image>
	</view>
</template>

<script>
	import {
		isEmptyObject
	} from "../../utils/utils.js"
	export default {
		data() {
			return {
				isEmptyObject,
				windowWidth: 0,
				windowHeight: 0,
				arr: [],
				// 动画最长持续时间
				duration: 5000,
				animations: [],
				lefts: [],
				tops: [],
				widths: [],
				properties: {
					show: {
						type: Boolean,
						value: true
					},
				}
			}
		},
		onReady() {
			this.setStyle();
		},

		methods: {
			setStyle() {
				let systeminfo = getApp().globalData.systeminfo
				if (isEmptyObject(systeminfo)) {
					uni.getSystemInfo({
						success: (res) => {
							this.windowWidth = res.windowWidth || res.screenWidth
							this.windowHeight = res.windowHeight || res.screenHeight
						},
					})
				} else {
					this.windowWidth = systeminfo.windowWidth || systeminfo.screenWidth 
					this.windowHeight = systeminfo.windowHeight || systeminfo.screenHeight 
				}
				let num = parseInt(Math.random() * 100) + 10;
				let arr = Array.apply(null, {
					length: num
				}).map(function(value, index) {
					return index + 1;
				})
				this.arr = arr;
			},
			dance(callback) {
				let windowWidth = this.windowWidth
				let windowHeight = this.windowHeight
				let duration = this.duration
				let animations = []
				let lefts = []
				let tops = []
				let widths = []
				let obj = {}
				for (let i = 0; i < this.arr.length; i++) {
					lefts.push(Math.random() * windowWidth)
					tops.push(-140)
					widths.push(Math.random() * 50 + 40)
					let animation = uni.createAnimation({
						duration: Math.random() * (duration - 1000) + 1000
					})
					animation.top(windowHeight).left(Math.random() * windowWidth).rotate(Math.random() * 960).step()
					animations.push(animation.export())
				}
				this.lefts = lefts;
				this.tops = tops;
				this.widths = widths;

				let timer = setTimeout(() => {
					this.animations = animations
					clearTimeout(timer)
				}, 200)
				let end = setTimeout(() => {
					this.setStyle();
					callback && callback()
					clearTimeout(end)
				}, duration)
			},
		}
	}
</script>

<style>
	.heart {
		position: fixed;
		z-index: 999;
		top: -140rpx;
		left: -100rpx;
		width: 40rpx;
		height: 40rpx;
	}
</style>
