<template>
<div class="athleteList">
  <div class="tableFilter">
    <div class="row" >
      <div class="col-sm-8 ">
        <div class="row ">
          <div class="col-sm-4">
            <label for="formFilterGender">Genre</label>
            <select class="form-control-sm filterFormInput" id="formFilterGender" v-model="filterGenderSelected">
              <option value="">-</option>
              <option value="H">Homme</option>
              <option value="F">Femme</option>
            </select>
          </div>
          <div class="col-sm-8">        
            <label for="birthYear" class="form-label">Année de naissance </label>
            <input type="number" class="form-control-sm filterFormInput" id="birthYear" placeholder="Ex. 1998" v-model="filterYearSelected">
          </div>
        </div>
      </div>
      <div class="col-sm-4">
        <button  class="btn btn-primary btnFiltre" @click="filterList()">Appliquer le filtre</button>
        <input type="reset"  class="btn btn-secondary btnFiltre" @click="removeFilter()" value="Retirer le filtre">
      </div>
    </div>
  </div>
   

    <table class="table table-responsive-lg">
        <thead>
            <tr>
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
        <tbody v-for="(athlete,index) in athleteList" :key="athlete.idAthlete">
          <athleteRowComponent :athlete="athlete" :index="index" v-on:editedAthleteForm="editedAthleteForm" v-on:deletedAthlete="deletedAthlete" v-on:initAthleteList="initAthleteList" />
        </tbody>
    </table>
    
</div>
</template>

<script>
import axios from 'axios';
import athleteFormComponent from '../components/athleteFormComponent.vue';
import athleteRowComponent from '../components/athleteRowComponent.vue';
export default {
    name: 'athleteListComponent',
    components: {
        athleteFormComponent,
        athleteRowComponent
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
      editedAthleteForm(){
        this.$emit("editedAthleteForm");
      },
      deletedAthlete(index){
        this.athleteList.splice(index,1)
        this.$emit("deletedAthlete");
      },
      initAthleteList(){
        this.getAthleteList();
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

.filterFormInput {
  margin-left: 1em;
}
.btnFiltre{
   margin-left: 10px;
   margin-bottom: 10px;
}

.tableFilter {
    padding: 5px 0 15px;
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 5px;
}

</style>
