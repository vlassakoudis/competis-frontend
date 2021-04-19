<template>
  <div class="athletePage">
    <headerComponent/>
    <h1>This is an athelte page</h1>

    <athleteListComponent/>


    <footerComponent/>
  </div>
</template>

<script>
import headerComponent from '../components/headerComponent.vue';
import footerComponent from '../components/footerComponent.vue';
import athleteListComponent from '../components/athleteListComponent.vue';

export default {
  name: 'AthletePage',
  components: {
    headerComponent,
    footerComponent,
    athleteListComponent
  }
}
</script>
