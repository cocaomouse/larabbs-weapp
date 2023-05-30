/*
 * 统一使用utils中的auth来操作登录相关storage。
 * 这里的setStorageSync和getStorageSync是同步的方式设置和获取Storage中的数据
 *
 */

export function getUser() {
	return wx.getStorageSync('user')
}

export function setUser(user, perms) {
	return wx.setStorageSync('user', user)
}

export function getToken() {
	return wx.getStorageSync('access_token')
}

export function getTokenExpiredAt() {
	return wx.getStorageSync('access_token_expired_at')
}

export function setToken(tokenPayload) {
	const accessToken = tokenPayload.access_token
	const accessTokenExpiredAt = new Date().getTime() + tokenPayload.expires_in * 1000

	wx.setStorageSync('access_token', accessToken)
	wx.setStorageSync('access_token_expired_at', accessTokenExpiredAt)
}

export function logout() {
	return wx.clearStorage()
}


