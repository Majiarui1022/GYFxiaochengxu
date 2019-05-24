// pages/commodity/commodity.js
var call = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indeximage: [],
    indicatorDots: false,  //是否显示面板指示点
    autoplay: true,      //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 500,       //滑动动画时长
    inputShowed: false,
    currentSwiper: 0,
    good_details:[],
    autoplay: true,
    project_id: '',//商品ID
    project_name: '',//商品名称
    shop_price: '',//商品售价
    old_price: '',//商品原价
    goods_desc: '',//商品介绍
    good_images: '',//商品轮播图
    good_details: '',//商品详情图
  },
  swiperChange: function (e) {
    this.setData({
      currentSwiper: '1'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.project_id = options.id
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    call.getData('/good/wx/good/' + this.project_id+'/', this.getCommodity, this.fail);//获取商品详情
    
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
  getCommodity(res){
    console.log(res)
      wx.setNavigationBarTitle({
        title: res.name
      })
    
    this.setData({
      'old_price': res.old_price,
      'shop_price': res.shop_price,
      'goods_desc': res.goods_desc,
      'project_name': res.name,
      'indeximage': res.good_images,
      'good_details': res.good_details
    })
  },
  fail(){
    console.log()
  },
  //加入购物车
  addshopCart() {
    var postData = {
      "nums": '1',
      "goods": this.project_id
    }
    call.request('/order/cart/', postData, this.setaddshopCart, this.fail);
  },
  setaddshopCart(){
    wx.showToast({
      title: '添加成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },
  goodorder(){
    var postData = {
      "good": this.project_id,
      "nums": '1',
      "address": ''
    }
    call.request('/order/wx/goodorder', postData, this.setaddshopCart, this.fail);
  },
  //页面跳转
  goLog(){
    console.log("商城")
    wx.switchTab({
      url: '/pages/log/log'
    })
  },
  goShopCart(){
    console.log("购物车")
    wx.switchTab({
      url: '/pages/shoppcart/shoppcart'
    })
  }
})