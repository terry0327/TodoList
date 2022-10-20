<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.done" @change="handleCheck(todo.id)"/>
      <span v-show="!todo.isEdit">{{todo.thing}}</span>
      <input type="text" :value="todo.thing" v-show="todo.isEdit" @blur="handleBlur(todo,$event)" ref="inputThing">
    </label>   
    <button class="btn btn-danger" @click="handleDelete(todo.id)">刪除</button>
    <button class="btn btn-edit" @click="handleEdit(todo)">編輯</button>
  </li>
</template>

<script>
  import pubsub from 'pubsub-js'
  import { computed } from 'vue';

  export default {
    name:'Item',
    props:['todo'],
    methods:{
      // 勾/取消勾選
      handleCheck(id){
        // this.checkTodo(id);
        this.$bus.$emit('checkTodo',id)
      },
      // 刪除item
      handleDelete(id){
        if(confirm('確定要刪除該代辦事項嗎？')){
          // this.deleteTodo(id)
          // this.$bus.$emit('deleteTodo',id)
          pubsub.publish('deleteTodo',id)
        }
      },
      handleEdit(todo){
        if(todo.hasOwnProperty('isEdit')){
          todo.isEdit = true
        }
        else{
          this.$set(todo,'isEdit',true)
        }
        this.$nextTick(function(){
          this.$refs.inputThing.focus()
        })
      },
      handleBlur(todo,e){
        todo.isEdit = false
        console.log(e);
        todo.thing = e.target.value
      }
    },
  }
</script>

<style scoped>
  li{
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label{
    float: left;
    cursor: pointer;
  }

  li label li input{
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button{
    float: right;
    display: none;
    margin-top: 3px;
  }

  li:before{
    content: initial;
  }

  li:last-child{
    border-bottom: none;
  }

  li:hover{
    background-color: #ddd;
  }

  li:hover button{
    display: block;
  }
</style>