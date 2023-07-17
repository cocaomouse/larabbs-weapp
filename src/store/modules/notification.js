import wepy from '@wepy/core'
import { getNotificationStats } from '@/api/notification'

const state = {
  unreadCount: 0
}

/* 定义getters */
var getters = {
  unreadCount: state => state.unreadCount
}
// 定义actions
// 调用接口，获取到未读消息数量，然后设置在 unreadCount 中
const actions = {
  async updateUnreadCount({ commit, getters }, params = {}) {
    if (!getters.isLoggedIn) {
      return
    }
    const statsResponse = await getNotificationStats({}, false)
    commit('setUnreadCount', statsResponse.data.unread_count)
  }
}
// 定义mutations
const mutations = {
  setUnreadCount(state, count) {
    state.unreadCount = count
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
