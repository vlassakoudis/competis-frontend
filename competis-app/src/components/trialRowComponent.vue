<template>
<tr>
    
    <td>{{trial.label}}</td>
    <td>{{trial.gender}}</td>
    <td>{{trial.startHour}}</td>
    <td>{{trial.duration}}</td>
    <td><button type="button" class="btn btn-primary" @click="showModalAthlete = true; editAthleteModal(trial);">Voir les athlètes</button></td>
    <td><button type="button" class="btn btn-warning" @click="showModalEdit = true;">Modifier</button></td>
    <td><button type="button" class="btn btn-danger" @click="deleteTrial(trial.idTrial,index)">Annuler</button></td>
    
    
    
    <vue-final-modal
      v-model="showModalAthlete"
      classes="modal-container"
      content-class="modal-content" >
      <button class="modal__close close" @click="showModalAthlete = false">
            <span aria-hidden="true">&times;</span>
      </button>
      <span class="modal__title">Athlètes inscrits à la course {{trial.label}} - {{trial.gender}} </span>
      <div class="modal__content">
        <p v-if="athleteListSelected.length == 0">Il n'y a pas encore d'athlète inscrit à cette course.</p>
        <ul v-else v-for="athlete in athleteListSelected" :key="athlete.idAthelte">
          <li>{{athlete.firstName}} {{athlete.lastName}}</li>
        </ul>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="showModalEdit"
      classes="modal-container"
      content-class="modal-content" >
      <button class="modal__close close" @click="showModalEdit = false;">
            <span aria-hidden="true">&times;</span>
      </button>
      <span class="modal__title">Modifier la course de {{trial.label}} - {{trial.gender}}</span>
      <div class="modal__content">
        <trialFormComponent v-on:editedTrial="updateEditedList" :trial="trial" :isEditing="true" />
      </div>
    </vue-final-modal>
</tr>
</template>

<script>
import axios from 'axios';
import trialFormComponent from '../components/trialFormComponent.vue';
export default {
    name: 'trialRowComponent',
    components: {
        trialFormComponent
    }, 
  data () {
    return {
        athleteList : [],
        url : this.$apiURL,
        showModalAthlete : false,
        showModalEdit : false,
        athleteListSelected : [],
    }
  },
  props : {
      trial : {},
      index : Number
  },
  watch : {
      showModalEdit : function(){
        this.$emit("initTrialList");
      }
  },
  methods : {
       getAthleteByTrial(){
          axios.get(this.url + "/trialbyathlete/" + this.trial.idTrial).then((response) => {
              this.athleteListSelected = response.data;
          }).catch((error) => {
              console.log(error);
          })
      },
        editAthleteModal(){
        this.getAthleteByTrial();
      },
        deleteTrial (idTrial){
          axios.delete(this.url + "/trial/" + idTrial).then((response) => {
              this.$emit("deletedTrial",this.index);
              console.log(response);
          }).catch((error) => {
              console.log(error);
          })
      },
      updateEditedList(){
        this.showModalEdit = false;
        this.$emit("editedTrialForm");
      }
  }
}
</script>


<style scoped >

</style>
