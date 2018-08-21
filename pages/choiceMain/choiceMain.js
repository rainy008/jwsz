var that;
var Bmob = require('../../utils/bmob.js');
Page({
  data: { 
    choseQuestionBank:"警务实战知识",

    // array: ['警务实战知识', '题库1', '题库2', '题库3', '题库4','题库5'],
    array: ['警务实战知识'],


    objectArray: [
      {
        id: 0,
        name: '警务实战知识'
      },
      // {
      //   id: 1,
      //   name: '题库1'
      // },
      // {
      //   id: 2,
      //   name: '题库2'
      // },
      // {
      //   id: 3,
      //   name: '题库3'
      // },
      // {
      //   id: 4,
      //   name: '题库4'
      // },
      // {
      //   id: 5,
      //   name: '题库5'
      // }
    ],
    index: 0,
    loading: true,
    currentUserId:''
  },

  onLoad: function () {
    that = this;
  },

  onShow: function () {

  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      choseQuestionBank: that.data.array[e.detail.value]
    })
  },

  chose:function(){
    var currentUser = Bmob.User.current();
    var currentUserId = currentUser.id;
    var User = Bmob.Object.extend("_User");
    var queryUser = new Bmob.Query(User);
    queryUser.get(currentUserId, {
      success: function (result) {
        var register = result.get("register");
        console.log(register)
        if (register==true){
          var choseQuestionBank = that.data.choseQuestionBank;
          if (choseQuestionBank != "点击选择") {
            getApp().globalData.choseQuestionBank = choseQuestionBank;
            getApp().globalData.score = 0;

            wx.navigateTo({
              url: '../singleChoiceExplain/singleChoiceExplain'
            });
          }
          else if (choseQuestionBank == "点击选择") {
            wx.showToast({
              title: '请选择题库',
              image: '../../images/warn.png',
              duration: 2000
            })
          }
        }
        else{
          wx.showModal({
            title: '尚未完善信息',
            content: '请放心填写，您的隐私绝不会被泄露',
            confirmText: '立即注册',
            confirmColor: '#1bd0bd',
            showCancel:false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../register/register'
                })
              } else if (res.cancel) {
              }
            }
          })
        }
        that.setData({
          loading: false
        })
      },
      error: function (object, error) {
      }
    });
  },

 
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '警务实战知识',
      path: '/pages/choiceMain/choiceMain',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
 
})