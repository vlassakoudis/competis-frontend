<template>
<div class="todoList">
    <ul>
        <li v-for="todo in todoList" :key="todo"> 
            {{todo}}
        </li>
    </ul>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'todoListComponent',
  data () {
    return {
        todoList : [],
        url : "http://192.168.0.147:3000/api/todo"
    }
  },
  methods : {
      getTodoList(){
          axios.get(this.url).then((response) => {
              this.todoList = response.data;
          }).catch((error) => {
              console.log(error);
          })
      }
  },
  mounted(){
      this.getTodoList();
  }
}
</script>


<style scoped lang="scss">

</style>
