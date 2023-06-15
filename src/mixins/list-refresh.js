export default {
  data: {
    page: 1,
    // 数据
    resourceData: [],
    // 有没有更多数据
    noMoreData: false,
    // 是否在加载中
    isLoading: false
  },
  // 因为下拉刷新其实是重置话题数据，
  // 所以调用时使用 this.loadData(true)，
  // 覆盖当前的 topics 数据，
  // 最后调用 stopPullDownRefresh 停止刷新。
  async onPullDownRefresh() {
    this.page = 1
    this.noMoreData = false
    await this.loadData(true)
    wx.stopPullDownRefresh()
  },
  // 页面滚动到底部时触发
  // 如果 noMoreData 为 true 则直接返回，
  // 否则将页数 page 加 1，然后获取下一页的话题数据；
  async onReachBottom() {
    // 如果没有更多内容，直接返回
    if (this.noMoreData || this.isLoading) {
      return
    }
    this.isLoading = true
    this.page += 1
    await this.loadData()
    this.isLoading = false
  },
  methods: {
    // 用于获取数据
    async loadData(reset = false) {
      // this.fetchData()获取接口数据
      const dataResponse = await this.fetchData()
      // resourceData用户列表数据
      this.resourceData = reset ? dataResponse.data.data : this.resourceData.concat(dataResponse.data.data)
      const pagination = dataResponse.data.meta
      // 根据分页设置是否还有更多数据
      if (pagination.current_page === pagination.last_page) {
        this.noMoreData = true
      }
    }
  }
}
