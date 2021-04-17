<template>
  <div class="HomePage">
          <headerComponent/>  

          <div class="container-fluid p-0 ">
            <div class="row">
              <div class="col">
                <bandTitleComponent title="Bienvenue" text="dufhsoufhrzhifoirhfih"/>
                <bandTitleComponent title="Contact" text="dfjdifjdifjdik"/>
              </div>
            </div>
          </div>
          <footerComponent/>
  </div>
</template>

<script>
import headerComponent from '../components/headerComponent.vue';
import footerComponent from '../components/footerComponent.vue';
import bandTitleComponent from '../components/bandTitleComponent.vue';

export default {
  name: 'HomePage',
  components: {
    headerComponent,
    footerComponent,
    bandTitleComponent
  }
}
</script>


