var call = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    front_image: []
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
    call.getData('/good/wx/activity', this.getActivity, this.fail);
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
  getActivity(res){
    console.log(res)
    this.setData({
      front_image: res
    })
  },

  goAcitivty(event){
    console.log(event)
    switch (event.currentTarget.dataset.classify){
      case 1:
        this.goAcitivtyOne(event.currentTarget.id, '1')
        break;
      case 2:
        this.goAcitivtyTwo(event.currentTarget.id, '2')
        break;
      case 3:
        this.goAcitivtyThree(event.currentTarget.id, '3')
        break;
    }
  },
  goAcitivtyThree(id, classify){
    wx.navigateTo({
      url: '/pages/freeactice/freeactice?classify=' + classify +'&id='+id
    })
  }
})