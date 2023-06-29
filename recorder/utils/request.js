// const BASE_URL = 'https://www.hanyin.asia:9091'
const BASE_URL = 'http://localhost:9092'
// const BASE_URL = 'http://82.157.247.7:9092'


const request = (options) => { // {url: '', method: '', data: {}}
	return new Promise((resolve, reject) => {

		// 非云
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			header: options.header || {},
			data: options.data || {},

			success: (res) => {
				const data = res.data
				resolve(data)
			},

			fail: (error) => {
				uni.showToast({
					icon: 'error',
					title: '网络拥挤，请稍后~'
				})
				reject(error)
			}
		})

	})
}

export default request