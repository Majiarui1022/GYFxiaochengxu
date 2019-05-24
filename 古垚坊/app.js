//app.js
var call = require("./utils/request.js");
App({
  data:{
    code: ''
  },
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          this.data.code = res.code
        }
      }
    })
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        console.log("meiyou")
      },
      fail: function (err) {
        //登录态过期
        console.log("guoqi", err)
        wx.login() //重新登录
        
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(3333,res.authSetting)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              var code = this.data.code
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
                  console.log(res.data)
                  wx.setStorage({    //setStorage 存储到Storage缓存中
                    key: 'token',   //本地缓存中指定的key
                    data: res.data
                  });
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
      }
    })
  },
  success: function (data) {
    console.log(data)
  },
  fail: function(){

  },
  globalData: {
    userInfo: null,
    token: '',
  }
})