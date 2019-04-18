const weatherMap = {
    'gn': '国内',
    'gj': '国际',
    'cj': '财经',
    'yl': '娱乐',
    'js': '军事',
    'ty': '体育',
    'other': '其他'
}
Page({
    data: {
        activeType: "gn",
        newsList: [],
        hotNews: {}
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
            complete: () => {
                callback && callback()
            }
        })
    },
    showNewsDetail(event){
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
          })
    }
})