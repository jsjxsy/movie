var config = require('./config.js')
module.exports = {
  fetchFilms: function(url, start, count, cb) {
    var that = this
    if (that.data.hasMore) {
      wx.request({
        url: url + '/' + start + '/' + count, //仅为示例，并非真实的接口地址
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          console.log(url)
          console.log(res.data.length)
          if (res.data.length == 0) {
            that.setData({
              hasMore: false,
            })
          } else {
            that.setData({
              films: that.data.films.concat(res.data),
              start: that.data.start + res.data.length,
              showLoading: false
            })
          }

          typeof cb == 'function' && cb(res.data)
        }
      })

    }
  },
  fetchFilmInitial: function(url, cb) {
    var that = this;
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res)
        that.setData({
          showLoading: false,
          films: res.data
        })
        wx.setNavigationBarTitle({
          title: "所有电影"
        })
        typeof cb == 'function' && cb(res.data)
      }
    })
  },
  fetchFilmDetail: function(url, id, cb) {
    var that = this;
    wx.request({
      url: url + '/' + id, //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(url)
        console.log(res.data)
        that.setData({
          showLoading: false,
          filmDetail: res.data
        })
        wx.setNavigationBarTitle({
          title: res.data.name
        })
        typeof cb == 'function' && cb(res.data)
      }
    })
  },

  search: function (searchUrl, keyword, start, count, cb) {
    var that = this;
    wx.request({
      url: searchUrl + '/' + keyword + '/' + start + '/' + count, //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(url)
        console.log(res.data)
        if (res.data.length == 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          that.setData({
            films: that.data.films.concat(res.data),
            start: that.data.start + res.data.length,
            showLoading: false
          })
        }

        typeof cb == 'function' && cb(res.data)
      }
    })
  }
}