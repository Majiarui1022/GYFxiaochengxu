var call = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SiteList:[]
  },


 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    call.getData('/user/wx/address/', this.getBannerList, this.fail);
  },

  getBannerList(data){
    this.setData({
      SiteList : data

    })
    console.log(this.data.SiteList)
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
    wx.reLaunch({
      url: '../home/home'
    })

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


   //用户点击某个地址修改地址
  GoChangeSite(event){
    console.log(event.currentTarget.id)
    wx.navigateTo({
      url: '/pages/site/site?id=' + event.currentTarget.id
    })
  },

  //点击添加地址
  goAddSite(){
    wx.navigateTo({
      url: '/pages/site/site'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})