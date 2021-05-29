import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'


Vue.prototype.$post = async (uri, params) => {
	return new Promise((reslove, reject) => {
		uni.request({
			url: uri,
			data: params,
			method: 'POST',
			header: {},
			success: (res) => {
				reslove(res.data);
			},
			fail: (error) => {
				uni.hideLoading();
				uni.showToast({
					title: '网络错误',
					duration: 2000
				});
			}
		});
	});
}

const app = new Vue({
    ...App
})
app.$mount()
