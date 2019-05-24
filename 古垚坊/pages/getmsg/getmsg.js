var app = getApp();
Page({
  data: {
  },
  getUserInfo: function () {
    let that = this;
    wx.login({
      success: res => {
        let code = res.code
        code = res.code;
        wx.getUserInfo({
          success: res => {
            console.log(this.data.code)
            // 可以将 res 发送给后台解码出 unionId
            // this.globalData.userInfo = res.userInfo
            // var code = this.data.code
            wx.request({
              url: 'http://94.191.15.122/user/wxlogin/', // 仅为示例，并非真实的接口地址
              data: {
                code: code,
                head: res.userInfo.avatarUrl,
                name: res.userInfo.nickName
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                wx.setStorage({    //setStorage 存储到Storage缓存中
                  key: 'token',   //本地缓存中指定的key
                  data: res.data
                });
                console.log(123)
                wx.switchTab({
                  url: '/pages/index/index'
                })
              }
            })
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              //从数据库获取用户信息
              //that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          });
        }
      }
    })
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

  }
})
