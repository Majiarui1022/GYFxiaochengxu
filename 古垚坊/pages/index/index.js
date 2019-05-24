var call = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indeximage:[
      "../../img/timg.jpg",
      "../../img/timg.jpg",
      "../../img/timg.jpg",
      "../../img/timg.jpg"
    ],
    indicatorDots: false,  //是否显示面板指示点
    autoplay: true,      //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 1000,       //滑动动画时长
    inputShowed: false,
    currentSwiper: 0,
    autoplay: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    pageNum: 5,//每页需加载的数据
    projectList: [{name:1},{name:2}],//商品列表数据
    animationData: {}
  },
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
        console.log("aaaa",avatarUrl, nickName)
      }
    })
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log('res.userInfo',res.userInfo)
              
            }
          })
        }
      }
    })
  },
  success:function(data){
    console.log(data)
  },
  fail: function(err){
    console.log(err)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getConfig()

    // wx.request({
    //   url: 'http://94.191.15.122/user/wx/index/', 
    //   data: {

    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getBannerList()
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
  getConfig(){
    call.getData('/user/wx/index', this.getBannerList, this.fail);
    call.getData('/good/wx/good/?ordering=' + this.data.pageNum + '&sold_num=1', this.getProjectList, this.fail);
  },
  // @接口调用-------------------
  //获取banner图
  getBannerList(data){
    this.setData({
      indeximage: data.sys_images
    })
  },
  //获取商品列表页
  getProjectList(data){
    console.log(this.data.projectList)
    console.log("商品列表", this.data.projectList)
    this.setData({
      projectList: data.results
    })

  },
  // 商品加入购物车
  addshopCart(event){
    var postData ={
      "nums": '1',
      "goods": event.currentTarget.id
    }
    call.request('/order/cart/', postData, this.setaddshopCart, this.fail);    
  },
  //加入成功回调
  setaddshopCart(data){
    wx.showToast({
      title: '添加成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },
  //页面跳转
  goCommodity(event){
    wx.navigateTo({
      url: '/pages/commodity/commodity?id=' + event.currentTarget.id
    })
  },
  
})