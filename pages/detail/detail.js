Page({
    data: {
        newsId: "",
        newsDetail: {}
    },
    onLoad(options) {
        this.setData({
            newsId: options.id
        })
        this.getNewsDetail()
        wx.setNavigationBarColor({
            frontColor: '#000000',
            backgroundColor: "#fff",
        })
        wx.setNavigationBarTitle({
            title: '快读·咨询'
        })
    },
    onPullDownRefresh() {
        this.getNewsDetail(() => {
            wx.stopPullDownRefresh()
        })
    },
    getNewsDetail(callback) {
        wx.request({
            url: 'https://test-miniprogram.com/api/news/detail',
            data: {
                id: this.data.newsId
            },
            success: res => {
                let result = res.data.result
                let date = new Date(result.date);
                result.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                this.setData({
                    newsDetail: result
                })
            },
            fail: err => {
                wx.showToast({ title: '网络连接失败,请稍后再试!' })
                console.log(err);
            },
            complete: () => {
                callback && callback()
            }
        })
    },
})