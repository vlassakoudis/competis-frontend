<template>
  <div class="athletePage">
    <headerComponent/>

    <div class="contenu">
      <h1>Athlètes enregistrés</h1>
      <button type="button" class="btn btn-primary" @click="displayForm = true" v-if="!displayForm">Inscrire un athlète</button>
      <button type="button" class="btn btn-secondary" @click="displayForm = false" v-if="displayForm">Annuler</button>
      <athleteFormComponent id="athleteFormComponent" v-on:addedAthlete="updateAthleteList" v-if="displayForm"/>
      <athleteListComponent id="athleteListComponent" ref="athleteList"/>
    </div>

    <footerComponent/>
  </div>
</template>

<script>
import headerComponent from '../components/headerComponent.vue';
import footerComponent from '../components/footerComponent.vue';
import athleteListComponent from '../components/athleteListComponent.vue';
import athleteFormComponent from '../components/athleteFormComponent.vue';

export default {

  name: 'AthletePage',
  components: {
    headerComponent,
    footerComponent,
    athleteListComponent,
    athleteFormComponent
  },
  data () {
    return{
       displayForm : false
    }
  },
  methods :{
    updateAthleteList(){
      console.log("update");
      this.$refs.athleteList.getAthleteList();
    }
  }
}
</script>

<style>
  #athleteListComponent{
    margin-top: 1em;
  }

  #athleteFormComponent{
    margin-top: 1em;
    margin-bottom: 1em;
    padding: 1em;
    border: 1px solid black;
  }
</style>
