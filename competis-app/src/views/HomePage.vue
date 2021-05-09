<template>
  <div class="HomePage">
    <headerComponent/>  
    <div class="container-sm">
      <div class="row">
        <div class="col">
          login
        </div>
      </div>
    </div>

    <footerComponent/>
  </div>
</template>

<script>
import headerComponent from '../components/headerComponent.vue';
import footerComponent from '../components/footerComponent.vue';

export default {
  name: 'HomePage',
  components: {
    headerComponent,
    footerComponent
  }
}
</script>


