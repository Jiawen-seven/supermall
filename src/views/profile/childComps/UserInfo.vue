<template>
  <div id="user-info">
    <div class="info-left">
      <img src="~assets/img/profile/avatar.svg" alt="" class="img1">
    </div>
    <div class="info-center">
      <div class="center-top">
        登录/注册
      </div>
      <div class="center-bottom">
        <img src="~assets/img/profile/phone.svg" alt="">暂无法绑定手机号
      </div>
    </div>
    <div class="info-right">
      <img src="~assets/img/profile/right.svg" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name :'UserInfo' 
}
</script>

<style>
#user-info{
  background-color: var(--color-tint);
  color: white;
  display: flex;
  padding: 10px;
}
.info-left .img1{
  width: 70px;
  height: 70px;
}
.info-center{
  padding: 15px 10px;
}
.info-center img,.info-right img{
  width: 20px;
  height: 20px;
}
.info-center img{
  position: relative;
  top: 5px;
  left: -3px;
  right: 0;
}
.info-center .center-bottom{
  font-size: 13px;
}
.info-right img{
  position: relative;
  left: 60px;
  top: 20px;
}

</style>