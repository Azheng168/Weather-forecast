<script>
	export default {
		globalData: {
			// 是否保持常亮，离开小程序失效
			keepscreenon: false,
			systeminfo: {},
			isIPhoneX: false,
			key: '6665a51dee274f08b11af78ada78e973', // 和风天气API接口key(开发)
			weatherIconUrl: 'https://cdn.heweather.com/cond_icon/', // 天气小图标
			requestUrl: {
				// 旧API
				weather: 'https://free-api.heweather.net/s6/weather',
				hourly: 'https://free-api.heweather.net/s6/weather/hourly',
			},
		},
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success: (res) => {
					this.globalData.systeminfo = res
					this.globalData.isIPhoneX = /iphonex/gi.test(res.model.replace(/\s+/, ''))
				},
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		-webkit-font-smoothing: antialiased;
		font-family: "PingHei", "Helvetica Neue", "Helvetica", "Arial", "Verdana", "sans-serif";
	}
</style>
