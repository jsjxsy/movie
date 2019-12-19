// pages/coming/coming.js
var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var url = 'https://localhost:8080/action_movie/lasted'

Page({
  data: {
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    tabItem: [{
      "id": 1,
      "text": "最新动作片"
    },
    {
      "id": 2,
      "text": "最新喜剧片"
    },
    {
      "id": 3,
      "text": "最新爱情片"
    },
    {
      "id": 4,
      "text": "最新科幻片"
    },
    {
      "id": 5,
      "text": "最新恐怖片"
    },
    {
      "id": 6,
      "text": "最新战争片"
    },
    {
      "id": 7,
      "text": "最新剧情片"
    },
    {
      "id": 8,
      "text": "最新动漫"
    }
    ],
    films: [],
    hasMore: true,
    showLoading: true,
    start: 0,
    windowHeight: 1000,
    windowWidth: 0
  },
  onLoad: function () {
    this.fetchTabData(this.data.currentTab + 1);

  },
  fetchTabData: function (i) {
    console.log("fetchTabData" + Number(i));
    switch (Number(i)) {
      case 1:
        url = 'https://localhost:8080/action_movie/all'
        break;
      case 2:
        url = 'https://localhost:8080/comedy_movie/all'
        break;
      case 3:
        url = 'https://localhost:8080/affectional_movie/all'
        break;
      case 4:
        url = 'https://localhost:8080/science_fiction_movie/all'
        break;
      case 5:
        url = 'https://localhost:8080/dracula_movie/all'
        break;
      case 6:
        url = 'https://localhost:8080/war_movie/all'
        break;
      case 7:
        url = 'https://localhost:8080/feature_movie/all'
        break;
      case 8:
        url = 'https://localhost:8080/comic_movie/all'
        break;
      default:
        return;
    }
    var that = this
    douban.fetchFilms.call(that, url, that.data.start, config.count);
  },

  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var that = this
    that.setData({
      films: [],
      hasMore: true,
      showLoading: true,
      start: 0
    })

    var cur = e.target.dataset.current;
    if (that.data.currentTab == cur) {
      return false;
    } else {
      that.setData({
        currentTab: cur
      })
      that.fetchTabData(that.data.currentTab + 1);
    }
  },

  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 3) {
      this.setData({
        scrollLeft: this.data.windowWidth + 65
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight * 2,
          windowWidth: res.windowWidth
        })
        console.log("windowHeight" + that.data.windowHeight)
        console.log("windowWidth" + that.data.windowWidth)
      }
    })
  },
  scroll: function (e) {
    //console.log(e)
  },
  scrolltolower: function () {
    var that = this
    douban.fetchFilms.call(that, url, that.data.start, config.count)
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      films: [],
      hasMore: true,
      showLoading: true,
      start: 0
    })
    douban.fetchFilms.call(that, url, that.data.start, config.count)
  },
  viewFilmDetail: function (e) {
    var data = e.currentTarget.dataset;
    console.log('viewFilmDetail==>' + data.id);
    wx.navigateTo({
      url: "../filmDetail/filmDetail?id=" + data.id
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})