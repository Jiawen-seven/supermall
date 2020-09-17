<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
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
    <div class="extraInfo">
      <p v-for="(item,index) in commentInfo.extraInfo" :key="index"> {{item}}</p>
    </div>
    <div class="explain">
      <span>{{commentInfo.explain}}</span>
    </div>
  </div>
</template>

<script>
import {formatDate} from "common/utils";
export default {
  name: 'CommentContext',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
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
  }
}
</script>

<style scoped>
  .comment-info {/**每一个用户的评论框 */
    padding: 5px 12px;
    color: #333;
    border-bottom: 3px solid #f2f5f8;
  }
  .info-user {/**用户信息 */
    padding: 10px 0 5px;
  }
  .info-user img {/**用户头像 */
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
  .info-user span {/**用户名 */
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
  }
  .info-detail,.extraInfo,.explain{/**评论信息 */
    padding-left: 5px;
  }
  .info-detail .info-other {/**评论时间和颜色尺码 */
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
  .info-imgs {/**评论图片框 */
    margin-top: 10px;
  }
  .info-imgs img {/**评论图片 */
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }
  .extraInfo{/**评论内容（限定的内容） */
    font-size: 12px;
    color: #999;
    margin-top: 10px;
    line-height: 18px;
  }
  .explain{/**商家回复信息 */
    margin: 10px 0;
    font-size: 12px;
    color: #777;
    line-height: 1.5;
  }
</style>