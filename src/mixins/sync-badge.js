export default {
  async onShow() {
    this.updateUnreadCount()
  },
  watch: {
    unreadCount: function() {
      this.updateUnreadCount()
    }
  },
  methods: {
    updateUnreadCount() {
      if (this.unreadCount) {
        /*
         * 为TabBar某一项的右上角添加文本
         * 参数 index TabBard的哪一项,从左边算起
         * 参数 text 是要设置的文本
         */
        wx.setTabBarBadge({
          index: 1,
          text: this.unreadCount.toString()
        });
      } else {
        /*
         * 移除TabBar某一项右上角的文本
         * 参数 index TabBar的哪一项，从左边算起
         */
        wx.removeTabBarBadge({
          index: 1
        })
      }
    }
  }
}
