<template>
  <div class="comment">
    <!--顶部导航栏-->
    <comment-navbar/>
    <!--评论内容-->
    <scroll class="content">
      <comment-context :comment-info="commentInfo"/>
    </scroll>
  </div>
</template>

<script>
import CommentNavbar from './childComps/CommentNavbar'
import CommentContext from './childComps/CommentContext'

import Scroll from 'components/common/scroll/Scroll'

import {getComment} from 'network/comment'

export default {
  name:'Comment',
  components: {
    CommentNavbar,
    CommentContext,
    Scroll
  },
  data() {
    return {
      iid: null, //获取商品id
      commentInfo: {} //存放评论
    }
  },
  created() {
    //1.先获取id,这个id是获取地址上的，所以地址上必须现有id。
    this.iid = this.$route.params.id
    //2.根据id获取数据
    getComment(this.iid).then(res => {
      //只需要评论数据即可
      if(res.result.rate.cRate !== 0){
        this.commentInfo = res.result.rate.list[0]
      }
    })
  }
}
</script>

<style scoped>
  .comment{
    /*因为导航栏是脱离标准流的，这里要设置相对布局 */
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    overflow: hidden;
    height: calc(100% - 44px);
  }
</style>