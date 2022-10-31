<template>
  <div>
    <h2>我是Home的內容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <router-link class="list-group-item" active-class="active" to="/home/news">News</router-link>
        </li>
        <li>
          <router-link class="list-group-item" active-class="active" to="/home/message">Message</router-link>
        </li>
      </ul>
      <!-- keep-alive：讓路由組件得以緩存 include：指定特定"組件"緩存，include是抓取"組件名" -->
      <!-- 如果要指定緩存複數組件，應 <keep-alive :include="['News','Message']"> -->
      <keep-alive include="News">
        <router-view></router-view>
      </keep-alive>      
    </div>
  </div> 
</template>

<script>
  export default {
    name:'Home'
  }
</script>

<style>

</style>