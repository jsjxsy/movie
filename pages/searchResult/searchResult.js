var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var url = 'https://localhost:8080/action_movie/search'
Page({
	data: {
		films: [],
		hasMore: true,
		showLoading: true,
		start: 0,
		windowHeight: 0,
		keyword: ''
	},
	onLoad: function(options) {
		var that = this
		that.setData({
			keyword: options.keyword
		})
		douban.search.call(that,url, that.data.keyword, that.data.start, config.count)
	},
	onShow: function() {
		var that = this
		wx.getSystemInfo({
		  success: function(res) {
			  that.setData({
				  windowHeight: res.windowHeight*2 + 112
			  })
		  }
		})
	},
	scroll: function(e) {
		// console.log(e)
	},
	scrolltolower: function() {
		var that = this
		douban.search.call(that,url, that.data.keyword, that.data.start, config.count)
	},
	viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset;
    console.log("==>"+data.id);
		wx.navigateTo({
			url: "../filmDetail/filmDetail?id=" + data.id +"&type=" + data.type
		})
	},
	onPullDownRefresh: function() {
		var that = this
		that.setData({
			films: [],
			hasMore: true,
			showLoading: true,
			start: 0
		})
		douban.search.call(that, url, that.data.keyword, that.data.start, config.count)
	},
	viewFilmByTag: function(e) {
		var data = e.currentTarget.dataset
		var keyword = data.tag
		wx.navigateTo({
			url: '../searchResult/searchResult?url=' + encodeURIComponent(searchByTagUrl) + '&keyword=' + keyword
		})
	}
})