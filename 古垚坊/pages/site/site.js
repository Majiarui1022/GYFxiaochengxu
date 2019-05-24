var call = require("../../utils/request.js")
var calls = require("../../utils/city.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    site_id:'',                     //地址ID
    userSite:{},                      //获取用户地址
    AddSite:{},                         //用户添加输入的地址信息
    region: [],
    detailed: '请选择',
    customItem: [],
    clas: 'ccc'
  },


  switch1Change(e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    if (this.data.site_id !== undefined && this.data.site_id !== '' && this.data.site_id !== null){
      this.setData({
        "userSite.is_default": e.detail.value
      })
    }else{
      this.setData({
        "AddSite.is_default": e.detail.value
      })
    }
    
  },


  //省市联动
  bindRegionChange: function (e) {
    var that = this
    //为了让选择框有个默认值，    
    that.setData({
      clas: ''
    })　　　//下拉框所选择的值
    console.log('picker发送选择改变，携带值为', e.detail.value)

    this.setData({
      //拼的字符串传后台
      detailed: e.detail.value[0] + " " + e.detail.value[1] + " " + e.detail.value[2],
      //下拉框选中的值
      region: e.detail.value
    })

    this.setData({
      "AddSite.area": e.detail.value[0] + " " + e.detail.value[1] + " " + e.detail.value[2]
    })
    console.log(this.data.AddSite)
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function (options) {
    this.data.site_id = options.id
    //获取个人地址   从购物车点击
    if (options.id){
      call.getData('/user/wx/address/' + this.data.site_id + '/', this.Site, this.fail);
    }

  },


  //获取个人地址
  Site(data){
      console.log(data)
      this.setData({
        userSite: data,
      })

    this.setData({
      detailed: data.area,
    })
  },


  //修改个人地址
  SendSiteUse(){

      let that = this
    console.log(typeof this.data.site_id !== undefined)
    if (this.data.site_id !== undefined && this.data.site_id !== '' && this.data.site_id !== null){
      var postData = that.data.userSite

       call.getPutData('/user/wx/address/' + that.data.userSite.id + '/', postData, that.SelectPart, that.fail);


    }else{
      console.log(that.data.AddSite)

      if (that.data.AddSite.is_default !== false && that.data.AddSite.is_default !== true){
        this.setData({
          "AddSite.is_default": false
        })
      }


      var postData = that.data.AddSite
      call.request('/user/wx/address/', postData, that.AddSiteUser, that.fail);
    }

   
  },
  
  //修改个人地址回调
  SelectPart(data){
    console.log(data)
    wx.redirectTo({
      url: '/pages/mySite/mySite'
    })
  },

  //添加地址回调
  AddSiteUser(data) {
    console.log(data)
    wx.redirectTo({
      url: '/pages/mySite/mySite'
    })
  },


  //修改联系人
  bindName(e){
    if (this.data.site_id !== undefined && this.data.site_id !== '' && this.data.site_id !== null){
      this.setData({
        "userSite.name": e.detail.value
      })
    } else {
      this.setData({
        "AddSite.name": e.detail.value
      })
      console.log(this.data.AddSite)
    }
    
  },

  //修改手机号
  bindPhone(e) {
    if (this.data.site_id !== undefined && this.data.site_id !== '' && this.data.site_id !== null) {
      this.setData({
        "userSite.mobile": e.detail.value
      })
    } else {
      this.setData({
        "AddSite.mobile": e.detail.value
      })
      console.log(this.data.AddSite)
    }

  
  },

  //修改城区
  bindCity(e) {

    if (this.data.site_id !== undefined && this.data.site_id !== '' && this.data.site_id !== null) {
      this.setData({
        "userSite.area": e.detail.value
      })
    } else {
      this.setData({
        "AddSite.area": e.detail.value
      })
    }

    
  },

  //修改详细地址
  bindSite(e) {

    if (this.data.site_id !== undefined && this.data.site_id !== '' && this.data.site_id !== null) {
      this.setData({
        "userSite.street": e.detail.value
      })
    } else {
      this.setData({
        "AddSite.street": e.detail.value
      })
    }

  
  },

  //修改邮政编码
  bindpostCode(e) {

    if (this.data.site_id !== undefined && this.data.site_id !== '' && this.data.site_id !== null) {
      this.setData({
        "userSite.postcode": e.detail.value
      })
    } else {
      this.setData({
        "AddSite.postcode": e.detail.value
      })
    }

    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 1000
    })
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