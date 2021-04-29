<template>
  <div class="athletePage">
    <headerComponent/>

    <div class="alert alert-success" role="alert" v-if="displayNotification">
    {{textNotification}}
    </div>
    <div class="contenu">
      <h1>Athlètes enregistrés</h1>
      <button type="button" class="btn btn-primary" @click="displayForm = true" v-if="!displayForm">Inscrire un athlète</button>
      <button type="button" class="btn btn-secondary" @click="displayForm = false" v-if="displayForm">Annuler</button>
      <athleteFormComponent id="athleteFormComponent" v-on:addedAthlete="updateAthleteList" v-if="displayForm"/>
      <athleteListComponent id="athleteListComponent" v-on:deletedAthete="displayTextNotification('L\'athlète a bien été supprimé !')" ref="athleteList"/>
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
       displayForm : false,
       textNotification : "",
       displayNotification : false
    }
  },
  methods :{
    updateAthleteList(){
      this.displayForm = false;
      this.displayTextNotification("L'athlète est bien inscrit ! ");
      this.$refs.athleteList.getAthleteList();
    },

    displayTextNotification(text)
    {
      this.textNotification = text;
      this.displayNotification = true;
      let self = this;
      setTimeout(function(){ self.displayNotification = false; }, 3000);
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
