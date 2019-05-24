var call = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
      ActivityList:[],     //我的活动列表
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    call.getData('/order/wx/activity/', this.getMyList, this.fail);
  },


  //我的活动列表
  getMyList(data){
      console.log(data)
      this.setData({
        ActivityList:data.results
      })
    console.log(this.data.ActivityList)
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

  goMany() {
    wx.navigateTo({
      url: '/pages/animals/animals'
    })
  },
})