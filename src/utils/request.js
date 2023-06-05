import wepy from '@wepy/core'
import store from '@/store'

// 服务器接口地址
const host = 'http://larabbs.test/api/v1/'

// 普通请求
const request = async (url, options = {}, showLoading = true) => {
	// 显示加载中
	if (showLoading) {
		wx.showLoading({
			title: '加载中'
		})
	}
	// 拼接请求地址
	options.url = host + url

    /*
      wx.request 发起网络请求,参数包括
         url:接口地址,
         data:请求参数,
         header:请求的header,
         method:请求的方法,有效值:OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
    */
	let response = await wepy.wx.request(options)

	if (showLoading) {
		// 隐藏加载中(与showLoading对应，成对出现)
		wx.hideLoading()
	}

	if (response.statusCode >= 200 && response.statusCode < 300) {
		return response
	}


	if (response.statusCode == 429) {
		wx.showModal({ // 显示一个动态框
			title: '提示',
			content: '请求太频繁，请稍后再试'
		})
	}

	if (response.statusCode == 500) {
		wx.showModal({
			title: '提示',
			content: '服务器错误，请联系管理员或重试'
		})
	}

    const error = new Error(response.data.message)
    error.response = response
    return Promise.reject(error)
}

const checkToken = async () => {
	// 从缓存中取出 Token
	const accessToken = store.getters.accessToken
	const expiredAt = store.getters.accessTokenExpiredAt

	// 如果token过期了，则调用刷新方法
	if (accessToken && new Date().getTime() > expiredAt) {
		try {
      return store.dispatch('refresh')
		} catch (err) {
      return store.dispatch('login')
		}
	}
}

// 普通请求
const authRequest = async (url, options = {}, showLoading = true) => {
	await checkToken()

	options.header = {
		Authorization: 'Bearer ' + store.getters.accessToken
	}

	return await request(url, options, showLoading)
}

// 上传文件
const uploadFile = async (url, options = {}, showLoading = true) => {
  // 显示加载中
  if (showLoading) {
    wx.showLoading({title: '上传中'})
  }
  // 拼接请求地址
  options.url = host + url
  checkToken()
  // 携带Authorization头 进行身份验证
  options.header = {
    Authorization: 'Bearer ' + store.getters.accessToken
  }
  // 调用uploadFile接口
  let response = await wepy.wx.uploadFile(options)

  if (showLoading) {
    wx.hideLoading()
  }
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response
  }

  wx.showModal({
    title: '提示',
    content: '服务器错误，请联系管理员或重试'
  })

  // 通过使用 Error 的实例获取错误原因 reason 对调试和选择性错误捕捉很有帮助。
  const error = new Error(response.data.message)
  error.response = response
  /*
   * Promise对象用于表示一个异步操作的最终完成（或失败）及其结果集
   * 静态函数 Promise.reject 返回一个被拒绝的 Promise 对象。
   * 通过使用 Error 的实例获取错误原因 reason 对调试和选择性错误捕捉很有帮助。
   */
  return Promise.reject(error)
}

export {
	request,
	authRequest,
  uploadFile
}
