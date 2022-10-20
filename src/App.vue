<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <Top @addTodo="addTodo"/>
        <List :todos="todos"/>
        <Bottom :todos="todos" @checkAllTodo="checkAllTodo" @clearAllTodo="clearAllTodo"/>
      </div>
    </div>
  </div>
</template>

<script>
  import pubsub from 'pubsub-js'
  import Top from './components/Top.vue'
  import List from './components/List.vue'
  import Bottom from './components/Bottom.vue'

  export default {
    name:"App",
    components: { 
      Top,
      List,
      Bottom
    },
    data() {
      return {
        todos:JSON.parse(localStorage.getItem('todos')) || []
      }  
    },   
    methods: {
      addTodo(todoObj){
        this.todos.unshift(todoObj)
      },
      checkTodo(id){
        this.todos.forEach((todo)=>{
          if(todo.id === id){
            todo.done = !todo.done
          }
        })
      },
      // 此處第一個參數為 _ 是因為使用pubsub除了自己需要的參數外
      // 還會有訂閱項目的名稱，此處用 _ 來佔位
      deleteTodo(_,id){
        this.todos = this.todos.filter((todo)=>{
          return todo.id !== id
        })
      },
      // 全選或取消全選
      checkAllTodo(done){
        this.todos.forEach((todo)=>{
          todo.done = done
        })
      },
      // 清除所有todo
      clearAllTodo(){
        this.todos = this.todos.filter((todo)=>{
          return !todo.done
        })
      }
    },
    watch:{
      todos:{
        deep:true,
        handler(value){
          localStorage.setItem('todos',JSON.stringify(value))
        }   
      }
    },
    mounted(){
      // 全局事件總線方法 ($bus)
      this.$bus.$on('checkTodo',this.checkTodo)
      // pubsub方法
      this.pubId = pubsub.subscribe('deleteTodo',this.deleteTodo)
    },
    beforeDestroy(){
      // 全局事件總線方法 ($bus)
      this.$bus.$off('checkTodo')
      // pubsub方法 取消訂閱需要從發布的ID去做取消
      pubsub.unsubscribe(this.pubId)
    }
  }
</script>

<style>
  body{
    background: #fff;
  }

  .btn{
    display: inline-block;
    padding: 4px 12px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(255, 255, 255, 0.8);
    border-radius: 4px;
  }

  .btn-danger{
    color: #fff;
    background-color: #da4f49;
    border: 1px solid #bd362f;
  }

  .btn-edit{
    color: #fff;
    background-color: skyblue;
    border: 1px solid rgb(30, 152, 201);
    margin-right: 5px;
  }

  .btn-danger:hover{
    color: #fff;
    background-color: #bd362f;
  }

  .btn:focus{
    outline: none;
  }

  .todo-container{
    width: 600px;
    margin: 0 auto;
  }

  .todo-container .todo-wrap{
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>