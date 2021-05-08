<template>
  <div id="formAthlete">
  <div class="row">
    <div class="col">
      <label for="lastName" class="form-label">Nom</label>
      <input type="text" class="form-control" id="lastName" v-model="newAthlete.lastName" >
    </div>
    <div class="col">
      <label for="firstName" class="form-label">Prénom</label>
      <input type="text" class="form-control" id="firstName" v-model="newAthlete.firstName">
    </div>
  </div>
  <div class="row">
    <div class="col">
      <label for="birthYear" class="form-label">Année de naissance</label>
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
    <div class="col" v-for="trial in trialList" :key="trial.idTrial">
       <input type="checkbox" v-bind:id="trial.idTrial" v-bind:name="trial.idTrial" v-bind:value="trial.idTrial" v-bind:disabled="trial.gender!=newAthlete.gender" v-model="trialListSelected">
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
        url : this.$apiURL,
        trialListSelected : []
    }
  },
  props: {
      idAthlete : Number,
      iAthleteList : Number,
      newAthlete : {
            idAthlete : '',
            lastName : '',
            firstName : '', 
            birthYear : '',
            club : '',
            gender : ''
        },
      isEditing : Boolean,
  },
  watch : {
    newAthlete : async function(){
      if(this.isEditing){
        this.trialListSelected = await this.getTrialsByAthlete();
      }
    }
  },
  methods : {
      addAthlete (){
          axios.post(this.url + "/athlete", this.newAthlete).then((response) =>{
            if(this.trialListSelected.length > 0)
            {
              this.addAthleteTrial(response.data.insertId);
            }
            this.$emit("addedAthlete");
            console.log(response.data);
          }).catch((error) =>{
            console.log(error);
          });
      },
      editAthlete(){
          axios.put(this.url + "/athlete", this.newAthlete).then((response) =>{
            
            this.editAthleteTrial(this.newAthlete.idAthlete);
            this.$emit("editedAthlete");
            console.log(response.data);
          }).catch((error) =>{
            console.log(error);
          });
      },
      addAthleteTrial (newAthleteId){
        
        let participations = this.getParticipations(newAthleteId);
        
        axios.post(this.url + "/athleteTrial", participations).then((response) =>{
          console.log(response.data);
        }).catch((error) =>{
          console.log(error);
        });
        
      },
      editAthleteTrial(athleteId){
        let participations = this.getParticipations(athleteId);
        console.log(athleteId);
        console.log(participations);
        axios.put(this.url + "/athleteTrial/"+ this.newAthlete.idAthlete, participations).then((response) =>{
          console.log(response.data);
        }).catch((error) =>{
          console.log(error);
        });
        
      },
      getParticipations(newAthleteId){
        let participations = [];

        for(let trialIdSelected of this.trialListSelected )
        {
          participations.push({"trialId" : trialIdSelected, "athleteId" : newAthleteId});
        }
        return participations;
      },
      getTrials(){
        axios.get(this.url + "/trial").then((response) => {
              this.trialList = response.data;
          }).catch((error) => {
              console.log(error);
          });
      },
      getTrialsByAthlete(){
          axios.get(this.url + "/athletebytrial/" + this.newAthlete.idAthlete).then((response) => {
              this.trialListSelected = response.data.map(trial => trial.idTrial);
          }).catch((error) => {
              console.log(error);
          })
      },
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
