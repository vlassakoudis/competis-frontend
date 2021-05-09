<template>
<div class="TrialList">
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Épreuve</th>
                <th scope="col">Genre</th>
                <th scope="col">Heure de départ</th>
                <th scope="col">Durée</th>
                <th scope="col">Athlètes</th>
                <th scope="col">Modifier</th>
                <th scope="col">Annuler</th>
            </tr>
        </thead>
        <tbody v-for="(trial,index) in trialList" :key="trial.idTrial">
            <trialRowComponent :trial="trial" :index="index" v-on:editedTrialForm="editedTrialForm" v-on:deletedTrial="deletedTrial" v-on:initTrialList="initTrialList" />            
        </tbody>
    </table>
</div>
</template>

<script>
import axios from 'axios';
import trialFormComponent from '../components/trialFormComponent.vue';
import trialRowComponent from '../components/trialRowComponent.vue';
export default {
    name: 'trialListComponent',
    components: {
        trialFormComponent,
        trialRowComponent
    },
  data () {
    return {
        url : this.$apiURL,
        trialList : [],
    }
  },
  methods : {
      getTrialList(){
          axios.get(this.url + "/trial").then((response) => {
              this.trialList = response.data;
          }).catch((error) => {
              console.log(error);
          })
      },
      editedTrialForm(){
         this.$emit("editedTrialForm");
      },
      deletedTrial(index){
          this.trialList.splice(index,1)
          this.$emit("deletedTrial");
      },
      initTrialList(){
        this.getTrialList();
      }
  },
  mounted(){
      this.getTrialList();
  }
}
</script>


<style scoped >

</style>
