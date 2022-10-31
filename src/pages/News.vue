<template>
  <ul>
    <h4 :style="{opacity}">我又跳進來了，我又跳出去了，打我啊笨蛋</h4>
    <li>message001 <input type="text"></li>
    <li>message002 <input type="text"></li>
    <li>message003 <input type="text"></li>
  </ul>
</template>

<script>
  export default {
    name:'News',
    data(){
      return{
        opacity:1
      }
    },
    // 路由組件獨有的生命週期 activated, deactivated。用於捕獲路由組件的激活狀態 
    activated(){
      console.log('News組件已被激活');
      this.timer = setInterval(()=>{
        console.log('@');
        this.opacity -= 0.03
        if(this.opacity <= 0) this.opacity = 1
      },16)
    },
    deactivated(){
      console.log('News組件已被cancel激活');
      clearInterval(this.timer)
    }
  }
</script> 

<style>

</style>