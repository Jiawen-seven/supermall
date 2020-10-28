<template>
  <div id="profile">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">小橘子商城</div>
    </nav-bar>
    <!-- 个人信息栏 -->
    <user-info></user-info>
    <!-- 余额栏 -->
    <money-info></money-info>
    <!-- 消息栏 -->
    <message-info :message="messageone"></message-info>
    <message-info :message="messagetwo"></message-info>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import UserInfo from './childComps/UserInfo'
import MoneyInfo from './childComps/MoneyInfo'
import MessageInfo from './childComps/MessageInfo'

export default {
  name:'Profile',
  data(){
    return{
      messageone:[
        {icon: '/img/message.9948ca06.svg', text: '我的消息'},
        {icon: '/img/pointer.71eb1cd2.svg', text: '积分商城'},
        {icon: '/img/vip.c9cdc9ff.svg', text: '会员卡'}
      ],
      messagetwo:[
        {icon: '/img/cart.0103a021.svg', text: '我的购物车'},
        {icon: '/img/shopping.7354bae5.svg', text: '下载购物APP'},
      ]
    }
  },
  components:{
    NavBar,
    UserInfo,
    MoneyInfo,
    MessageInfo
  }
}
</script>

<style>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>