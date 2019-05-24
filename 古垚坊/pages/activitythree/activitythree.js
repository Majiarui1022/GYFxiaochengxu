var call = require("../../utils/request.js")
// pages/activitythree/activitythree.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'Activityclassify':'',
    'ActivityId': ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'Activityclassify': options.classify,
      'ActivityId': options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getActivityclassify()
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
  getActivityclassify(){
    switch (this.data.Activityclassify) {
      case '1':
        this.getAcitivtyOne(this.data.Activityclassify)
        break;
      case '2':
        this.getAcitivtyTwo(this.data.Activityclassify)
        break;
      case '3':
        call.getData('/good/wx/activitythree/' + this.data.ActivityId , this.getAcitivtyThree, this.fail);
        break;
    }
  },
  getAcitivtyThree(res){
    console.log(res)
  }
})