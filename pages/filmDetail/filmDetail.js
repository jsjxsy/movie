// pages/filmDetail/filmDetail.js
var douban = require('../../comm/script/fetch')
var url = 'https://localhost:8080/action_movie/get_movie_by_id'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filmDetail: {},
    showLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id
    var type = options.type
    console.log(type)
    switch(type){
      case "动作片":
      break;
      case "爱情片":
        url = 'https://localhost:8080/affectional_movie/get_movie_by_id';
      break;
      case "喜剧片":
        url = 'https://localhost:8080/comedy_movie/get_movie_by_id';
        break;
      case "科幻片":
        url = 'https://localhost:8080/science_fiction_movie/get_movie_by_id';
        break;
      case "恐怕片":
        url = 'https://localhost:8080/dracula_movie/get_movie_by_id';
        break;
      case "战争片":
        url = 'https://localhost:8080/war_movie/get_movie_by_id';
        break;
      case "剧情片":
        url = 'https://localhost:8080/feature_movie/get_movie_by_id';
        break;
      case "动漫":
        url = 'https://localhost:8080/comic_movie/get_movie_by_id';
        break;
        default:
        break;

    }
    douban.fetchFilmDetail.call(that, url, id, type)
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

  },

  copyTBL: function (e) {
    var self = this;
    wx.setClipboardData({
      data: e.currentTarget.dataset.text,
      success: function (res) {
        // self.setData({copyTip:true}),
        wx.showModal({
          title: '提示',
          content: '复制成功',
          success: function (res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    });
  }

})