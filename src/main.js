import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  el:'#app',
  components:{
    App
  },
  // 簡寫
  // h 所代表的函數為createElement
  render:h => h(App),
  beforeCreate() {
    Vue.prototype.$bus =  this
  },
  // 完整寫法
  // createElement為函數，創建元素，可以藉由此函數渲染內容
  // render(createElement){
  //   return createElement(App)
  // }
})