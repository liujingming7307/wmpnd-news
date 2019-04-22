Page({
    data: {
        activeType: "gn",
        newsList: [],
        hotNews: {},
        typeList: [
            { key: 'gn', value: '国内' },
            { key: 'gj', value: '国际' },
            { key: 'cj', value: '财经' },
            { key: 'yl', value: '娱乐' },
            { key: 'js', value: '军事' },
            { key: 'ty', value: '体育' },
            { key: 'other', value: '其他' }
        ]
    },
    onLoad() {
        this.getNewsList();
        wx.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: "#2c95dc",
        })
        wx.setNavigationBarTitle({
            title: '快读·咨询'
        })
    },
    onPullDownRefresh() {
        this.getNewsList(() => {
            wx.stopPullDownRefresh()
        })
    },
    changeType(event) {
        this.setData({
            activeType: event.currentTarget.dataset.key
        })
        this.getNewsList();
    },
    getNewsList(callback) {
        wx.request({
            url: 'https://test-miniprogram.com/api/news/list',
            data: {
                type: this.data.activeType
            },
            success: res => {
                let result = res.data.result
                let arr = [];
                for (var item in result) {
                    let date = new Date(result[item].date);
                    result[item].date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                    if (item === '0') {
                        this.setData({
                            hotNews: result[0]
                        })
                        continue;
                    }
                    arr.push(result[item]);
                }
                this.setData({
                    newsList: arr
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
    showNewsDetail(event) {
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
        })
    }
})