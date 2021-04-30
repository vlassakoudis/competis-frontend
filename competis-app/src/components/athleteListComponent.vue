<template>
<div class="athleteList">
    <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">Année de naissance</th>
                <th scope="col">Club</th>
                <th scope="col">Genre</th>
                <th scope="col">Courses</th>
                <th scope="col">Modifier</th>
                <th scope="col">Supprimer</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(athlete,index) in athleteList" :key="athlete.idAthlete">
                <th scope="row">{{athlete.idAthlete}}</th>
                <td>{{athlete.lastName}}</td>
                <td>{{athlete.firstName}}</td>
                <td>{{athlete.birthYear}}</td>
                <td>{{athlete.club}}</td>
                <td>{{athlete.gender}}</td>
                <td><button type="button" class="btn btn-primary" @click="showModalTrial = true; editTrialModal(athlete);">Voir les courses</button></td>
                <td><button type="button" class="btn btn-warning" @click="showModalEdit = true">Modifier</button></td>
                <td><deleteAthleteComponent v-on:deleted="deleteAthlete" :idAthlete="athlete.idAthlete" :iAthleteList="index" /></td>
            </tr>
        </tbody>
    </table>


    <vue-final-modal
      v-model="showModalTrial"
      classes="modal-container"
      content-class="modal-content" >
      <button class="modal__close close" @click="showModalTrial = false">
            <span aria-hidden="true">&times;</span>
      </button>
      <span class="modal__title">Inscription de {{athleteSelected.firstName}} {{athleteSelected.lastName}} </span>
      <div class="modal__content">
        <p v-if="trialListSelected.length == 0">L'athlète n'est pas encore inscrit à une course.</p>
        <ul v-else v-for="trial in trialListSelected" :key="trial.idTrial">
          <li>{{trial.label}} {{trial.gender}}</li>
        </ul>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="showModalEdit"
      classes="modal-container"
      content-class="modal-content" >
      <button class="modal__close close" @click="showModalEdit = false">
            <span aria-hidden="true">&times;</span>
      </button>
      <span class="modal__title">Modifier l'inscription de {{athleteSelected.firstName}} {{athleteSelected.lastName}}</span>
      <div class="modal__content">
        <athleteFormComponent :athleteEdit="athleteSelected" :isEditing="true" />
      </div>
    </vue-final-modal>

</div>
</template>

<script>
import axios from 'axios';
import deleteAthleteComponent from '../components/deleteAthleteComponent.vue';
import athleteFormComponent from '../components/athleteFormComponent.vue';
export default {
    name: 'athleteListComponent',
    components: {
        deleteAthleteComponent,
        athleteFormComponent
    },
  data () {
    return {
        athleteList : [],
        url : this.$apiURL,
        showModalTrial : false,
        showModalEdit : false,
        athleteSelected : {},
        trialListSelected : []
    }
  },
  methods : {
      getAthleteList(){
          axios.get(this.url + "/athlete").then((response) => {
              this.athleteList = response.data;
          }).catch((error) => {
              console.log(error);
          })
      },
      deleteAthlete(athleteIDDeleted){
          this.athleteList.splice(athleteIDDeleted,1);
          this.$emit("deletedAthete");
      },
      getTrialsByAthelte(idAthlete){
          axios.get(this.url + "/athletebytrial/" + idAthlete).then((response) => {
              this.trialListSelected = response.data;
          }).catch((error) => {
              console.log(error);
          })
      },
      editTrialModal(athlete){
        this.athleteSelected = athlete;
        this.getTrialsByAthelte(athlete.idAthlete);
        console.log(this.trialListSelected);
      }
  },
  mounted(){
      this.getAthleteList();
  }
}
</script>


<style scoped>

::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
  max-width: 50%;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

</style>
