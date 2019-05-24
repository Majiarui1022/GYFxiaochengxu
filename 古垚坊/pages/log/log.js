var call = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectIcon: [],
    changeIcon:'',
    projectList:[]
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
    call.getData('/good/wx/category/', this.getProjectIcon, this.fail);    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("页面出现")
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
    console.log("上拉加载")
  },
  getProjectIcon(res){
    console.log(res)
    this.setData({
      'projectIcon':res
    })
    if(res.length>0){
      call.getData('/good/wx/good?priority=&category=' + res[0].id, this.getProjectList, this.fail);  
    }
  },
  activeIcon(event){
    console.log(event)
    this.setData({
      'changeIcon': event.currentTarget.dataset.index
    })
    call.getData('/good/wx/good?priority=&category='+event.currentTarget.id, this.getProjectList, this.fail);    
  },
  /**  
   * 调取商品列表数据
   */
  getProjectList(res){
    console.log(res)
    this.setData({
      'projectList': res.results
    })
  },
  // 商品加入购物车
  addshopCart(event) {
    var postData = {
      "nums": '1',
      "goods": event.currentTarget.id
    }
    call.request('/order/cart/', postData, this.setaddshopCart, this.fail);
  },
  //加入成功回调
  setaddshopCart(data) {
    wx.showToast({
      title: '添加成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },
  //页面跳转
  goCommodity(event) {
    wx.navigateTo({
      url: '/pages/commodity/commodity?id=' + event.currentTarget.id
    })
  },
})