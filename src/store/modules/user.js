import wepy from '@wepy/core';
import { login, logout, refresh, register } from '@/api/auth'
import * as auth from '@/utils/auth'
import isEmpty from 'lodash/isEmpty'
import { getCurrentUser, updateUser } from '@/api/user'

const getDefaultState = () => {
	return {
	  user: auth.getUser(),
    accessToken: auth.getToken(),
    accessTokenExpiredAt: auth.getTokenExpiredAt()
	}
}

// 通过getDefaultState从storage中获取初始值
const state = getDefaultState()

// 定义 getters,通过isEmpty判断,如果access_token存在则用户为已登录状态，还定义了用户信息以及token
var getters = {
  isLoggedIn: state => !isEmpty(state.accessToken),
  user: state => state.user,
  accessToken: state => state.accessToken,
  accessTokenExpiredAt: state => state.accessTokenExpiredAt
}

// 定义actions 完成了登录以及获取用户信息的逻辑，登录成功后自动获取用户信息
const actions = {
	async login ({ dispatch, commit }, params = {}) {
	  const loginData = await wepy.wx.login()
	  params.code = loginData.code

	  const authResponse = await login(params)

	  commit('setToken', authResponse.data)
	  auth.setToken(authResponse.data)

	  dispatch('getUser')
	},
	async getUser ({ dispatch, commit }) {
      const userResponse = await getCurrentUser()

      commit('setUser', userResponse.data)
      auth.setUser(userResponse.data)

      //dispatch('getUser')
	},
	async refresh ({ dispatch, commit, state }, params = {}) {
      const refreshResponse = await refresh(state.accessToken, {}, false)
      commit('setToken', refreshResponse.data)
      auth.setToken(refreshResponse.data)

      dispatch('getUser')
	},
	async logout ({ commit, state }) {

	  await logout(state.accessToken)

	  // 清空 storage
	  auth.logout()
	  commit('resetState')
	},
  async register ({ dispatch }, params = {}) {
      const loginData = await wepy.wx.login()
      params.code = loginData.code

      await register(params)
      await dispatch('login')
  },
  async updateUser ({ commit }, params = {}) {
    const editResponse = await updateUser(params)

    commit('setUser', editResponse.data)
    auth.setUser(editResponse.data)
  }
}

// 定义 mutations 定义了设置用户 设置token
const mutations = {
  setUser(state, user) {
	  state.user = user
  },
  setToken(state, tokenPayload) {
	  state.accessToken = tokenPayload.access_token
	  // new Date().getTime返回值精确到毫秒，所以过期时间需要乘以1000
	  state.accessTokenExpiredAt = new Date().getTime + tokenPayload.expires_in * 1000
  },
  resetState: (state) => {
  	Object.assign(state, getDefaultState())
  }
}

export default {
	state,
	getters,
	actions,
	mutations
}
