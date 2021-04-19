<template>
  <div class="todo">
    <h1>Liste des todos depuis l'API</h1>
    <todoListComponent/>
  </div>
</template>

<script>
import todoListComponent from '../components/todoListComponent.vue';

export default {
    
  name: 'todo',
  components: {
      todoListComponent
  }
}
</script>


