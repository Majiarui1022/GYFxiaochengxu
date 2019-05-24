var call = require("../../utils/request.js")

// page/component/new-pages/cart/cart.js
// 默认请求第一页
var numbers = 1;
var bool = true;
Page({
  data: {
    show_edit: "block",
    edit_name: "提交订单",
    edit_show: "none",
    edit_number: "",
    edit_index: "",
    removeID:[],     //删除购物车列表数据iD
    removeIndex:[],    //删除列表数据下标
    site:'',
    jasSote:false,     //是否有地址
    // list: [],               // 购物车列表
    // hasList: false,          // 列表是否有数据
    // 默认展示数据
    hasList: true,
    // 商品列表数据
    list: [],
    // 金额
    totalPrice: 0, // 总价，初始为0
    // 全选状态
    selectAllStatus: false, // 全选状态，默认全选
  },

  onShow() {
    // 加载动画
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 1000
    })
    // 价格方法
    this.count_price();

    call.getData('/order/cart/', this.getProjectCart, this.fail);

    //请求地址
    call.getData('/user/wx/default_address/', this.getUserSiste, this.fail);
  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {
   
    
  },
  getProjectCart(res){
    console.log(res)
    this.setData({
      'list':res
    })
    console.log(this.data.list)
    this.OnReadyPrice()
    this.count_price()
  },

  //请求地址回调
  getUserSiste(data){
      console.log(data)
      this.setData({
        site:data,
        jasSote:true
      })
  },


  /**
   * 当前商品选中事件
   */
  selectList(e) {
    var that = this;
    // 获取选中的radio索引
    var index = e.currentTarget.dataset.index;
    // 获取到商品列表数据
    var list = that.data.list;
    // 默认全选
    that.data.selectAllStatus = true;
    // 循环数组数据，判断----选中/未选中[selected]
    list[index].choice = !list[index].choice;


    var postData = {
      "choice": list[index].choice
    }
    call.getPutData('/order/cart/' + list[index].id + '/',postData, this.SelectPart, this.fail);



    // 如果数组数据全部为selected[true],全选
    for (var i = list.length - 1; i >= 0; i--) {
      if (!list[i].choice) {
        that.data.selectAllStatus = false;
        break;
      }
    }
    // 重新渲染数据
    that.setData({
      list: list,
      selectAllStatus: that.data.selectAllStatus
    })
    // 调用计算金额方法
    that.count_price();
  },



  SelectPart(data){
    console.log(this.data.list)
      console.log(data)
  },
 


  // 编辑
  btn_edit: function () {
    var that = this;
    if (bool) {
      that.setData({
        edit_show: "none",
        edit_name: "删除",
        show_edit: "none"
      })
      bool = false;
    } else {
      that.setData({
        edit_show: "block",
        edit_name: "提交订单",
        show_edit: "block"
      })
      bool = true;
    }

  },
  // 删除
  deletes: function (e) {
    var that = this;
    // 获取索引
    const index = e.currentTarget.dataset.index;
    // 获取商品列表数据
    let list = this.data.list;
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: function (res) {
        if (res.confirm) {
          // 删除索引从1
          list.splice(index, 1);
          // 页面渲染数据
          that.setData({
            list: list
          });
          // 如果数据为空
          if (!list.length) {
            that.setData({
              hasList: false
            });
          } else {
            // 调用金额渲染数据
            that.count_price();
          }
        } else {
          console.log(res);
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
  /**
   * 修改购物车数量
   */
  editProjectNumber(e) {
    console.log(e.detail)
    this.setData({
      'edit_number': e.currentTarget.dataset.type,
      'edit_index': e.currentTarget.dataset.index
    })
    var postData ={
      "nums": e.currentTarget.dataset.number
    }
    call.getPutData('/order/cart/' + e.currentTarget.id + '/', postData, this.setProjectnumber, this.fail);
  },
  setProjectnumber(res){
    if (res.msg == 'success'){
      call.getData('/order/cart/', this.getProjectCart, this.fail);
      wx.showToast({
        title: '加载中',
        icon: "loading",
        duration: 1000
      })
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    // 全选ICON默认选中
    let selectAllStatus = this.data.selectAllStatus;
    // true  -----   false
    selectAllStatus = !selectAllStatus;
    // 获取商品数据
    let list = this.data.list;
    // 循环遍历判断列表中的数据是否选中
    for (let i = 0; i < list.length; i++) {
      list[i].choice = selectAllStatus;
    }
    // 页面重新渲染
    this.setData({
      selectAllStatus: selectAllStatus,
      list: list
    });
    // 计算金额方法
    this.count_price();

    var postData = {
      'choice': selectAllStatus
    }
    call.request('/order/cartchoice/', postData, this.allSelect, this.fail);    

  },


    //全选请求
  allSelect(data){
    console.log(data)
  },


  canvas: function (object) {
    let _this = this;
    let realWidth, realHeight;
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#mycanvas').boundingClientRect()
    query.exec(function (res) {
      //res就是 该元素的信息 数组
      realWidth = res[0].width;
      realHeight = res[0].height;
      console.log('realHeight', realHeight);
      console.log('realWidth', realWidth);
      const ctx = wx.createCanvasContext('mycanvas');
      ctx.drawImage("../../images/ctx-bg.jpg", 0, 0, realWidth, realHeight);
      ctx.drawImage(_this.data.canvasUserPic, (realWidth * 0.099), (realHeight * 0.052), (realWidth * 0.091), (realWidth * 0.091));
      ctx.setFontSize(12);
      ctx.setFillStyle("#a38874");
      ctx.fillText(object.date, (realWidth * 0.201), (realHeight * 0.076));
      ctx.setFontSize(14);
      ctx.setFillStyle("#a38874");
      ctx.fillText("农历" + object.lunar, (realWidth * 0.201), (realHeight * 0.099));
      ctx.drawImage("../../images/swiper-bg.png", (realWidth * 0.099), (realHeight * 0.112), (realWidth * 0.8), (realHeight * 0.60));
      ctx.drawImage(_this.data.canvasShowImg, (realWidth * 0.099), (realHeight * 0.112), (realWidth * 0.8), (realHeight * 0.30));
      ctx.drawImage("../../images/swiper-detail.png", (realWidth * 0.099), (realHeight * 0.395), (realWidth * 0.8), (realHeight * 0.03));
      ctx.setFontSize(16);
      ctx.setFillStyle("#8d7665");

      ctx.setTextAlign('center')
      ctx.fillText(object.title1, realWidth / 2, _this.calculateWH(2, 620, realWidth, realHeight));
      ctx.fillText(object.title2, realWidth / 2, _this.calculateWH(2, 666, realWidth, realHeight));

      ctx.drawImage("../../images/swiper-line.png", (realWidth - realWidth * 0.71) / 2, (realHeight * 0.528), (realWidth * 0.71), (realHeight * 0.0195));
      ctx.drawImage("../../images/luckpic.png", _this.calculateWH(1, 267, realWidth, realHeight), _this.calculateWH(2, 763, realWidth, realHeight), _this.calculateWH(1, 204, realWidth, realHeight), _this.calculateWH(2, 60, realWidth, realHeight));
      ctx.setFontSize(12);
      ctx.fillText(object.luck_title, realWidth / 2, _this.calculateWH(2, 880, realWidth, realHeight));
      ctx.drawImage("../../images/code.jpg", _this.calculateWH(1, 229, realWidth, realHeight), _this.calculateWH(2, 989, realWidth, realHeight), _this.calculateWH(1, 292, realWidth, realHeight), _this.calculateWH(1, 292, realWidth, realHeight))
      ctx.draw();

      setTimeout(function () {
        wx.canvasToTempFilePath({
          canvasId: 'mycanvas',
          success: function (res) {
            var tempFilePath = res.tempFilePath;
            _this.setData({
              canvasUrl: tempFilePath
            })
            if (tempFilePath !== '') {
              _this.setData({
                isShowCav: false
              });
              wx.hideLoading();
              wx.previewImage({
                current: _this.data.canvasUrl, // 当前显示图片的http链接  
                urls: [_this.data.canvasUrl], // 需要预览的图片http链接列表  
              })
            }
          },
          fail: function (res) {
            console.log(res);
          }
        });
      }, 500);
    })
  },//下载图片
  onShow1: function (object) {
    let _this = this;
    _this.setData({
      isShowCav: true
    })
    wx.downloadFile({
      url: object.avatarurl,
      success: function (sres) {
        _this.setData({
          canvasUserPic: sres.tempFilePath
        });
        wx.downloadFile({
          url: object.show_img,
          success: function (sres1) {
            _this.setData({
              canvasShowImg: sres1.tempFilePath
            });
            _this.canvas(object);
          }
        })
      }
    })
  },
  // 提交订单   或者删除订单
  btn_submit_order: function () {
    // 显示加载图标  
    wx.showLoading({
      title: '正在加载中...',
    })
    var that = this
      //全选删除
    if (that.data.edit_show === "none" && that.data.selectAllStatus == true){

      call.getDeleteData('/order/cartchoice/1/', that.deleteList, that.fail);

        return false;
    } else if (that.data.edit_show === "none" && that.data.selectAllStatus == false){
        //不是全选删除
      var postData = {choice:[]}
      console.log(postData.choice)
      for (var i in that.data.list) {
        if (that.data.list[i].choice == true){
          console.log(that.data.list[i].id)
          that.data.removeID.push(that.data.list[i].id)
          that.data.removeIndex.push(i)
          postData.choice.push(that.data.list[i].id)
        }
      }
      console.log(postData)
      call.getPutData('/order/cartchoice/1/', postData, that.deleteListpro, that.fail);
      return false

    }else{

      var that = this;
      console.log(that.data.totalPrice);

      // 调起支付
      // wx.requestPayment(
      //   {
      //     'timeStamp': '',
      //     'nonceStr': '',
      //     'package': '',
      //     'signType': 'MD5',
      //     'paySign': '',
      //     'success': function (res) { },
      //     'fail': function (res) { },
      //     'complete': function (res) { }
      //   })
      wx.hideLoading();
      wx.showModal({
        title: '提示',
        content: '合计金额' + that.data.totalPrice + "暂未开发",
      })



    }
  },



  //购物车列表全部删除
  deleteList(data){
    this.setData({
      list:[],
      selectAllStatus:false,
      totalPrice:0
    })
    wx.hideLoading();
      console.log(data)
  },


  //购物车列表部分删除
  deleteListpro(data){
    console.log(data)
    for (var j in this.data.removeIndex){
      this.data.list.splice(this.data.removeIndex[j],1)
    }
    this.count_price();
    this.setData({
      removeID:[],
      removeIndex:[]
    })
    wx.hideLoading();
  },

  // 收藏
  btn_collert: function () {
    wx.showToast({
      title: '收藏暂未开发',
      duration: 2000
    })
  },
  /**
   * 计算总价
   */
  count_price() {
    // 获取商品列表数据
    let list = this.data.list;
    console.log(list)
    // 声明一个变量接收数组列表price
    let total = 0;
    // 循环列表得到每个数据
    for (let i = 0; i < list.length; i++) {
      // 判断选中计算价格
      if (list[i].choice) {
        // 所有价格加起来 count_money
        total += list[i].nums * list[i].good.price;
      }
    }
    console.log(list)
    // 最后赋值到data中渲染到页面
    this.setData({
      list: list,
      totalPrice: total.toFixed(2)
    });
  },

  // 页面初次打开时判断是否全选

    OnReadyPrice(){
      let that = this;
      let list = this.data.list;
      that.data.selectAllStatus = true;
      console.log(list)
      for(var i in list){
        if (!list[i].choice){
          this.setData({
            selectAllStatus: false
          })
          break
        }
      }

      this.setData({
        selectAllStatus: that.data.selectAllStatus
      })
      this.count_price()
    },


  // 下拉刷新
  // onPullDownRefresh: function () {
  //   // 显示顶部刷新图标  
  //   wx.showNavigationBarLoading();
  //   var that = this;

  //   console.log(that.data.types_id);
  //   console.log(that.data.sel_name);
  //   wx.request({
  //     url: host + '请求后台数据地址',
  //     method: "post",
  //     data: {
  //       // 刷新显示最新数据
  //       page: 1,
  //     },
  //     success: function (res) {

  //       // console.log(res.data.data.datas);
  //       that.setData({
  //         list: res.data.data.datas
  //       })
  //     }
  //   })

  //   // 隐藏导航栏加载框  
  //   wx.hideNavigationBarLoading();
  //   // 停止下拉动作  
  //   wx.stopPullDownRefresh();

  // },

  // 加载更多
  // onReachBottom: function () {
  //   var that = this;
  //   // 显示加载图标  
  //   wx.showLoading({
  //     title: '正在加载中...',
  //   })
  //   numbers++;

  //   // 页数+1  
  //   wx.request({
  //     url: host + '后台数据地址',
  //     method: "post",
  //     data: {
  //     // 分页
  //       page: numbers,
  //     },
  //     // 请求头部  
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       // 回调函数 

  //       var num = res.data.data.datas.length;
  //       // console.log(num);
  //       // 判断数据长度如果不等于0，前台展示数据，false显示暂无订单提示信息
  //       if (res.data.data.status == 0) {

  //         for (var i = 0; i < res.data.data.datas.length; i++) {
  //           that.data.list.push(res.data.data.datas[i]);
  //         }
  //         // 设置数据  
  //         that.setData({
  //           list: that.data.list
  //         })

  //       } else {
  //         wx.showToast({ title: '没有更多了', icon: 'loading', duration: 2000 })
  //       }


  //       // 隐藏加载框  
  //       wx.hideLoading();
  //     }
  //   })

  // },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log(151321)
    this.setData({
      edit_show: "block",
      edit_name: "提交订单",
      show_edit: "block"
    })
    bool = true;
  },

})