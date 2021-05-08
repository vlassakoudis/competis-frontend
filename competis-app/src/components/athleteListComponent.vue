<template>
<div class="athleteList">
    <form>
    <label for="formFilterGender">Genre : </label>
    <select class="form-control" id="formFilterGender" v-model="filterGenderSelected">
      <option value="">-</option>
      <option value="H">Homme</option>
      <option value="F">Femme</option>
    </select>
    <label for="birthYear" class="form-label">Année de naissance</label>
    <input type="number" class="form-control" id="birthYear" v-model="filterYearSelected">
    <button  class="btn btn-primary" @click="filterList()">Appliquer le filtre</button>
    <input type="reset"  class="btn btn-secondary" @click="removeFilter()" value="Retirer le filtre">
    </form>
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
                <td><button type="button" class="btn btn-warning"  @click="showModalEdit = true; editEditModal(athlete);">Modifier</button></td>
                <td><button type="button" class="btn btn-danger" @click="deleteAthlete(athlete.idAthlete,index)">Désinscrire</button></td>
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
      <button class="modal__close close" @click=";showModalEdit = false">
            <span aria-hidden="true">&times;</span>
      </button>
      <span class="modal__title">Modifier l'inscription de {{athleteSelected.firstName}} {{athleteSelected.lastName}}</span>
      <div class="modal__content">
        <athleteFormComponent v-on:editedAthlete="updateEditedList" :newAthlete="athleteSelected" :isEditing="true" />
      </div>
    </vue-final-modal>
    
</div>
</template>

<script>
import axios from 'axios';
import athleteFormComponent from '../components/athleteFormComponent.vue';
export default {
    name: 'athleteListComponent',
    components: {
        athleteFormComponent
    },
  data () {
    return {
        athleteList : [],
        athleteListFull : [],
        url : this.$apiURL,
        showModalTrial : false,
        showModalEdit : false,
        athleteSelected : {},
        trialListSelected : [],
        filterGenderSelected : "",
        filterYearSelected : "",
    }
  },
  methods : {
      getAthleteList(){
          axios.get(this.url + "/athlete").then((response) => {
              this.athleteList = response.data;
              this.athleteListFull = this.athleteList;
          }).catch((error) => {
              console.log(error);
          })
      },
      getTrialsByAthlete(idAthlete){
          axios.get(this.url + "/athletebytrial/" + idAthlete).then((response) => {
              this.trialListSelected = response.data;
          }).catch((error) => {
              console.log(error);
          })
      },
      deleteAthlete (idAthlete,indexListAthlete){
          axios.delete(this.url + "/athlete/" + idAthlete).then((response) => {
              this.athleteList.splice(indexListAthlete,1)
              this.$emit("deletedAthlete");
              console.log(response);
          }).catch((error) => {
              console.log(error);
          })
      },
      editTrialModal(athlete){
        this.athleteSelected = athlete;
        this.getTrialsByAthlete(athlete.idAthlete);
      },
      editEditModal(athlete){
        this.athleteSelected = athlete;
      },
      updateEditedList(){
        this.showModalEdit = false;
        this.$emit("editedAthleteForm");
      },
      filterList(){
        this.athleteList = this.athleteListFull;
        if(this.filterGenderSelected != "" && this.filterYearSelected != ""){
          this.athleteList = this.athleteList.filter(a => (a.gender == this.filterGenderSelected && a.birthYear == this.filterYearSelected ));
        }
        else{
          if(this.filterGenderSelected != "" && this.filterYearSelected == ""){
            this.athleteList = this.athleteList.filter(a => (a.gender == this.filterGenderSelected));
          }
          else{
            if(this.filterGenderSelected == "" && this.filterYearSelected != ""){
              this.athleteList = this.athleteList.filter(a => (a.birthYear == this.filterYearSelected ));
            }
          }
        }
      },
      removeFilter(){
        this.athleteList = this.athleteListFull;
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
