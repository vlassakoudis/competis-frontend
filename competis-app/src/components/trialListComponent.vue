<template>
<div class="TrialList">
    <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Course</th>
                <th scope="col">Genre</th>
                <th scope="col">Heure de départ</th>
                <th scope="col">Durée</th>
                <th scope="col">Athlètes</th>
                <th scope="col">Modifier</th>
                <th scope="col">Annuler</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(trial,index) in trialList" :key="trial.idTrial">
                <th scope="row">{{trial.idTrial}}</th>
                <td>{{trial.label}}</td>
                <td>{{trial.gender}}</td>
                <td>{{trial.startHour}}</td>
                <td>{{trial.duration}}</td>
                <td><button type="button" class="btn btn-primary" @click="showModalAthlete = true; editAthleteModal(trial);">Voir les athlètes</button></td>
                <td><button type="button" class="btn btn-warning" @click="showModalEdit = true; editEditModal(trial);">Modifier</button></td>
                <td><button type="button" class="btn btn-danger" @click="deleteTrial(trial.idTrial,index)">Annuler</button></td>
            </tr>
        </tbody>
    </table>

    
    <vue-final-modal
      v-model="showModalAthlete"
      classes="modal-container"
      content-class="modal-content" >
      <button class="modal__close close" @click="showModalAthlete = false">
            <span aria-hidden="true">&times;</span>
      </button>
      <span class="modal__title">Athlètes inscrits à la course {{trialSelected.label}} - {{trialSelected.gender}} </span>
      <div class="modal__content">
        <p v-if="athleteListSelected.length == 0">Il n'y a pas encore d'athlète inscrit à cette course</p>
        <ul v-else v-for="athlete in athleteListSelected" :key="athlete.idAthelte">
          <li>{{athlete.firstName}} {{athlete.lastName}}</li>
        </ul>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="showModalEdit"
      classes="modal-container"
      content-class="modal-content" >
      <button class="modal__close close" @click=";showModalEdit = false">
            <span aria-hidden="true">&times;</span>
      </button>
      <span class="modal__title">Modifier la course de {{trialSelected.label}} - {{trialSelected.gender}}</span>
      <div class="modal__content">
        <trialFormComponent v-on:editedTrial="updateEditedList" :trial="trialSelected" :isEditing="true" />
      </div>
    </vue-final-modal>
</div>
</template>

<script>
import axios from 'axios';
import trialFormComponent from '../components/trialFormComponent.vue';
export default {
    name: 'trialListComponent',
    components: {
        trialFormComponent
    },
  data () {
    return {
        trialList : [],
        athleteList : [],
        url : this.$apiURL,
        showModalAthlete : false,
        showModalEdit : false,
        trialSelected : {},
        athleteListSelected : []
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
       getAthleteByTrial(idTrial){
          axios.get(this.url + "/trialbyathlete/" + idTrial).then((response) => {
              this.athleteListSelected = response.data;
          }).catch((error) => {
              console.log(error);
          })
      },
        editAthleteModal(trial){
        this.trialSelected = trial;
        this.getAthleteByTrial(trial.idTrial);
      },
      editEditModal(trial){
        this.trialSelected = trial;
      },
        deleteTrial (idTrial,indexListTrial){
          axios.delete(this.url + "/trial/" + idTrial).then((response) => {
              this.trialList.splice(indexListTrial,1)
              this.$emit("deletedTrial");
              console.log(response);
          }).catch((error) => {
              console.log(error);
          })
      },
      updateEditedList(){
        this.showModalEdit = false;
        this.$emit("editedTrialForm");
      }
  },
  mounted(){
      this.getTrialList();
  }
}
</script>


<style scoped >

</style>
