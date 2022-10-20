<template>
  <div class="todo-header">
    <input type="text" placeholder="請輸入你的任務名稱，輸入完畢後點擊Enter" v-model="thing" @keyup.enter="addThing"/>
  </div>
</template>

<script>
  import {nanoid} from 'nanoid'
  export default {
    name:'Top',
    data(){
      return{
        thing:'',
      }
    },
    methods:{     
      // 包裝對象todoObj並回傳App.vue
      addThing(e){ 
        // 校驗輸入
        if(!this.thing.trim())
          return alert('輸入不得為空')
        const todoObj = {
          id:nanoid(),
          thing:this.thing,
          done:false
        }
        this.$emit('addTodo',todoObj)
        this.thing = ''
      }
    },
  }
  
</script>

<style scoped>
  .todo-header input{
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
  }

  .todo-header input:focus{
    outline: none;
    border-color: rgba(82, green,168 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, green,168 236, 0.6);
  }
</style>