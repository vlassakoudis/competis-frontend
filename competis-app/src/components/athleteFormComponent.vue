<template>
  <div id="formAthlete">
  <div class="row">
    <div class="col">
      <label for="lastName" class="form-label">Nom</label>
      <input type="text" class="form-control" id="lastName" v-model="newAthlete.lastName">
    </div>
    <div class="col">
      <label for="firstName" class="form-label">Prénom</label>
      <input type="text" class="form-control" id="firstName" v-model="newAthlete.firstName">
    </div>
  </div>
  <div class="row">
    <div class="col">
      <label for="birthYear" class="form-label">Date de naissance</label>
      <input type="number" class="form-control" id="birthYear" v-model="newAthlete.birthYear">
    </div>
    <div class="col">
      <label for="club" class="form-label">Club</label>
      <input type="text" class="form-control" id="club" v-model="newAthlete.club">
    </div>
    <div class="col">
      <label class="form-label">Genre</label>
      <div class="row">
        <div class="form-check col">
          <input class="form-check-input" type="radio" name="genre" value="H" id="homme"  @click="changeListTrial('H')" v-model="newAthlete.gender">
          <label class="form-check-label" for="homme"  @click="changeListTrial('H')">
          Homme
          </label>
        </div>
        <div class="form-check col">
          <input class="form-check-input" type="radio" name="genre" value="F"  @click="changeListTrial('F')" id="femme" v-model="newAthlete.gender">
          <label class="form-check-label" for="femme"  @click="changeListTrial('F')">
          Femme
          </label>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col" v-for="trial in trialListGender" :key="trial.idTrial">
       <input type="checkbox" v-bind:id="trial.idTrial" v-bind:name="trial.label" v-bind:value="trial.idTrial" v-model="trialListSelected">
       <label v-bind:for="trial.idTrial"> {{trial.label}} {{trial.gender}}</label><br>
    </div>
  </div>
    <button class="btn btn-success" v-if="!isEditing" @click="addAthlete()">Inscrire</button>
    <button class="btn btn-warning" v-else @click="editAthlete()">Modifier</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'athleteFormComponent',
  data () {
    return {
        trialList : [],
        trialListGender : [],
        url : this.$apiURL,
        newAthlete : {
          lastName : '',
          firstName : '', 
          birthYear : '',
          club : '',
          gender : ''
        },
        trialListSelected : [],
        isEditForm : false
    }
  },
  props: {
      idAthlete : Number,
      iAthleteList : Number,
      athleteEdit : Object,
      isEditing : Boolean
  },
  watch : {
    'isEditing' () {
      console.log("gello");
      this.newAthlete = this.athleteEdit;
    }
  },
  methods : {
      addAthlete (){
          axios.post(this.url + "/athlete", this.newAthlete).then((response) =>{

            this.addAthleteTrial(response.data.insertId);
            this.$emit("addedAthlete");
          
          }).catch((error) =>{
            console.log(error);
          });
      },
      editAthlete(){

      },
      addAthleteTrial (newAthleteId){

        for(let trialIdSelected of this.trialListSelected )
        {
          let newParticipation = {"idTrial" : trialIdSelected, "idAthlete" : newAthleteId};
          
          axios.post(this.url + "/athleteTrial", newParticipation).then((response) =>{
            console.log(response.data);
          }).catch((error) =>{
            console.log(error);
          });
        }
      },
      getTrials(){
        axios.get(this.url + "/trial").then((response) => {
              this.trialList = response.data;
          }).catch((error) => {
              console.log(error);
          });
      },
      changeListTrial(genderSelected){
        if(genderSelected == 'H'){
          this.trialListGender = this.trialList.filter(trial => trial.gender == 'H');
        }
        else
        {
          this.trialListGender = this.trialList.filter(trial => trial.gender == 'F');
        }
      }
  },
  mounted(){
      this.getTrials();
  }
}
</script>


<style scoped lang="scss">
  button{
    margin-right: 1em;
  }
  
  
</style>
