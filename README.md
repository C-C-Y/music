## 仿移动端网易云音乐(只涉及歌曲部分)
基于Vue2+VueRouter+Vuex +Nginx
## Project setup
```
npm install
```

## API
[网易云音乐Node版API](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)
### 现完成页面
1. 登录页面
2. 首页推荐
3. FM 
5. 每日推荐
6. 排行榜
7. 歌单
8. 播放器(mini+全屏)
9. 歌曲评论展示
10. 歌手页面
11. 用户个人页
12. 搜索
13. 专辑
14. 新歌速递
15. 新碟上架
16. 歌词页面
### 小优化
+ 图片使用Vue-LazyLoad实现懒加载
+ 手机号输入只能输入数字
+ 密码不能输入汉字
+ 本地缓存数据,减少请求

### 演示地址
由于刚开始就想的是仿一个客户端,也没添加游客功能,所以账号密码都是要真的...  
`为了方便测试,我在这里放一个公共的账号,会定期检查是否可用:`  
账号:13404674535          
密码:123456     
Chrome移动调试模式效果最佳    
`如果不能滑动请刷新一下`,这个bug手机上测试的时候没有出现,一直没搞懂为什么    
[myMusic](http://zazahui.online)  






