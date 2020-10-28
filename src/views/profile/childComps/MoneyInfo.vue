<template>
  <div class="money-info">
    <div class="content">
      <div class="num">
        <span>0.00</span>元
      </div>
      <div class="text">
        我的余额
      </div>
    </div>
    <div class="content">
      <div class="num">
        <span>0</span>个
      </div>
      <div class="text">
        我的优惠
      </div>
    </div>
    <div class="content">
      <div class="num">
        <span>0</span>分
      </div>
      <div class="text">
        我的积分
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'MoneyInfo'
}
</script>

<style>
.money-info{
  display: flex;
}
.money-info .content{
  flex: 1;
  text-align: center;
  padding: 20px;
  border-right: #e9e9e9 solid 1px;
  border-bottom: #e9e9e9 solid 10px;
}
.money-info .content:last-of-type{
  border-right: none;
}

.num span{
  color: tomato;
  font-weight: 700;
  font-size: 20px;
}
.text{
  font-size: 13px;
  padding-top: 5px;
}
</style>