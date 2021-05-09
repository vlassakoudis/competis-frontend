<template>
<tr>

    <td>{{athlete.lastName}}</td>
    <td>{{athlete.firstName}}</td>
    <td>{{athlete.birthYear}}</td>
    <td>{{athlete.club}}</td>
    <td>{{athlete.gender}}</td>
    <td><button type="button" class="btn btn-primary" @click="editTrialModal()">Voir les courses</button></td>
    <td><button type="button" class="btn btn-warning"  @click="showModalEdit = true; ">Modifier</button></td>
    <td><button type="button" class="btn btn-danger" @click="deleteAthlete()">Désinscrire</button></td>

    <vue-final-modal
      v-model="showModalTrial"
      classes="modal-container"
      content-class="modal-content" >
      <button class="modal__close close" @click="showModalTrial = false">
            <span aria-hidden="true">&times;</span>
      </button>
      <span class="modal__title">Inscription de {{athlete.firstName}} {{athlete.lastName}} </span>
      <div class="modal__content">
        <p v-if="trialList.length == 0">L'athlète n'est pas encore inscrit à une course.</p>
        <ul v-else v-for="trial in trialList" :key="trial.idTrial">
          <li>{{trial.label}} {{trial.gender}}</li>
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
      <span class="modal__title">Modifier l'inscription de {{athlete.firstName}} {{athlete.lastName}}</span>
      <div class="modal__content">
        <athleteFormComponent v-on:editedAthlete="updateEditedList" :newAthlete="athlete" :isEditing="true" />
      </div>
    </vue-final-modal>

    
</tr>
</template>

<script>
import axios from 'axios';
import athleteFormComponent from '../components/athleteFormComponent.vue';
export default {
    name: 'athleteRowComponent',
    components: {
        athleteFormComponent
    },
  data () {
    return {
        url : this.$apiURL,
        showModalTrial : false,
        showModalEdit : false,
        trialList : [],
    }
  },
  props : {
      athlete : {},
      index : Number
  },
    watch : {
      showModalEdit : function(){
        this.$emit("initAthleteList");
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
      getTrialsByAthlete(){
          axios.get(this.url + "/athletebytrial/" + this.athlete.idAthlete).then((response) => {
              this.trialList = response.data;
          }).catch((error) => {
              console.log(error);
          })
      },
      deleteAthlete (){
          axios.delete(this.url + "/athlete/" + this.athlete.idAthlete).then((response) => {
              this.$emit("deletedAthlete",this.index);
              console.log(response);
          }).catch((error) => {
              console.log(error);
          })
      },
      editTrialModal(){
        this.getTrialsByAthlete();
        this.showModalTrial = true;
      },
      updateEditedList(){
        this.showModalEdit = false;
        this.$emit("editedAthleteForm");
      },
  }
}
</script>


<style scoped>

</style>
