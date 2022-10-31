<template>
  <ul class="todo-main">
    <transition-group 
      name="animate__animated animate__bounce" 
      enter-active-class="animate__backInRight"
      leave-active-class="animate__backOutRight"
    >
      <!-- <Item v-for="todoObj in todos" :key="todoObj.id" :todo="todoObj"/> -->
      <div v-for="(todos,index) in groupedTodos" :key="index" class="row">
        <Item v-for="todoObj in todos" :key="todoObj.id" :todo="todoObj" class="col"/>
      </div>
    </transition-group>
  </ul>
</template>

<script>
  import Item from './Item.vue'
  import 'animate.css'
  import _ from 'lodash'

  export default {
    name:'List',
    components:{
      Item
    },
    computed:{
      groupedTodos(){
        let _ = require("lodash");
        return _.chunk(this.todos,1)
      }
    },
    props:['todos']
  }
</script>

<style scoped>
  .todo-main{
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty{
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
</style>