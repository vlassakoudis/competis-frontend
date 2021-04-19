<template>
  <div class="TrialPage">
    <headerComponent/>
    <h1>This is an trial page</h1>
    <trialListComponent/>
    <footerComponent/>
  </div>
</template>

<script>
import headerComponent from '../components/headerComponent.vue';
import footerComponent from '../components/footerComponent.vue';
import trialListComponent from '../components/trialListComponent.vue';

export default {
  name: 'TrialPage',
  components: {
    headerComponent,
    footerComponent,
    trialListComponent
  }
}
</script>
