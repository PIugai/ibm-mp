const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
// go to LIST page
  goToListPage: function () {
    wx.navigateTo({
      url: '../list/list'
    })
  },

  onShow: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

      wx.switchTab({
        url: '../list/list',
      })

    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          console.log(userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })

        }
      })
    }
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    // start
    console.log("test")
    console.log(this.data.userInfo)
    console.log(app.globalData.userId)
    console.log(`${app.globalData.host}${app.globalData.version}users/${app.globalData.userId}`)
    let name = this.data.userInfo.nickName;
    let photo = this.data.userInfo.avatarUrl;

    let userUpdate = {
      name: name,
      photo: photo
    }

    wx.request({
      url: `${app.globalData.host}${app.globalData.version}users/${app.globalData.userId}`,
      method: 'PUT',
      data: userUpdate,
      success() {
        wx.switchTab({
          url: '../list/list',
        })
      }
    })

  }
})