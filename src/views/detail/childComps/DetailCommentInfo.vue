<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more" @click="moreComment">
        更多
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>|</span>
        <span class="style">{{commentInfo.style}}</span>
      </div>
      <p>{{commentInfo.content}}</p>
      <div class="info-imgs">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "common/utils";
export default {
  name:'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    iid: {
      type: String,
      default: null
    }
  },
  filters: {
    showDate(value){ //非常常用的功能！
      //服务器返回的是对应的时间戳，我们要展示的是真正的时间，如何转换？
      //1.将时间戳转成Date对象,时间戳是秒，而date对象传的是毫秒，所以要*1000
      const date = new Date(value*1000)
      
      //2.将date进行格式化，转成对应的字符串。这个功能太常用，已经封装好了。直接用
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')

    }
  },
  methods: {
    moreComment() {//更多评论的页面跳转
      this.$router.push('/comment/' + this.iid) //使用路由跳转
    }
  }
}
</script>

<style scoped>
  .comment-info {
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  .header-title {
    float: left;
    font-size: 15px;
  }
  .header-more {
    float: right;
    margin-right: 10px;
    font-size: 13px;
  }
  .info-user {
    padding: 10px 0 5px;
  }
  .info-user img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .info-user span {
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }
  .info-detail {
    padding-left: 5px;
  }
  .info-detail .info-other {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  .info-other .date {/**评论时间 */
    margin-right: 8px;
  }
  .info-other .style {/**颜色和尺码 */
    margin-left: 8px;
  }
  .info-detail p {/**评论内容*/
    font-size: 14px;
    color: #777;
    line-height: 1.5;
  }
  .info-imgs {
    margin: 10px 0;
  }
  .info-imgs img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
</style>