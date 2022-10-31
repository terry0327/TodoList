<template>
  <h2>我是About的內容</h2> 
</template>

<script>
  export default {
    name:'About',
    
    // 組件內的路由守衛
    // 通過路由規則，進入該組件時被調用
    beforeRouteEnter(to, from, next){
      if(to.meta.isAuth){
        if(localStorage.getItem('account') === 'terry0327'){
          next()
        }
        else{
          alert('帳號名不對！無權限查看！')
        }
      }
      else{
        next()
      }
    },
    // 通過路由規則，離開該組件時被調用
    beforeRouteLeave(to, from, next){

    }
  }
</script>

<style>

</style>