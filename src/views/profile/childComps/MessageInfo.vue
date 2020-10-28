<template>
  <div class="message-info">
    <div v-for="(item,index) in message" :key="index" class="message-item">
      <img :src="item.icon" alt="">
      <span>{{item.text}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageInfo',
  props:{
    message:{
      type: Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style>
.message-info{
  border-bottom: #e9e9e9 solid 10px;
}
.message-info:last-of-type{
  border-bottom: none;
}
.message-item{
  padding: 10px;
  border-bottom: #e9e9e9 solid 1px;
}
.message-item:last-of-type{
  border-bottom: none;
}
.message-item img{
  width: 25px;
  height: 25px;
}
.message-item span{
  font-size: 15px;
  position: relative;
  left: 10px;
  bottom: 5px;
}
</style>