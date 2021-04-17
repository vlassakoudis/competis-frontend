<template>
  <div class="TrialPage">
    <headerComponent/>
    <h1>This is an trial page</h1>
    <footerComponent/>
  </div>
</template>

<script>
import headerComponent from '../components/headerComponent.vue';
import footerComponent from '../components/footerComponent.vue';

export default {
  name: 'TrialPage',
  components: {
    headerComponent,
    footerComponent
  }
}
</script>
