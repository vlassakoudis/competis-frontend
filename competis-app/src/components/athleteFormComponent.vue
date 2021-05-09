<template>
  <div id="formAthlete">
  <div class="row">
    <div class="col">
      <label for="lastName" class="form-label">Nom</label>
      <input type="text" class="form-control" id="lastName" placeholder="Nom" v-model="newAthlete.lastName" required>
    </div>
    <div class="col">
      <label for="firstName" class="form-label">Prénom</label>
      <input type="text" class="form-control" id="firstName" placeholder="Prénom" v-model="newAthlete.firstName" required>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <label for="birthYear" class="form-label">Année de naissance</label>
      <input type="number" class="form-control" id="birthYear" placeholder="Ex. 1998" v-model="newAthlete.birthYear" min="1900" max="2050" required>
    </div>
    <div class="col">
      <label for="club" class="form-label">Club</label>
      <input type="text" class="form-control" id="club" placeholder="Club" v-model="newAthlete.club" required>
    </div>
    <div class="col">
      <label for="form-label">Genre</label>
      <select class="form-control" id="gender" v-model="newAthlete.gender" @change="changeListTrialGender()" required>
        <option value="H">Homme</option>
        <option value="F">Femme</option>
      </select>
    </div>
  </div>
  <div class="row">
    <div class="col" v-for="trial in trialListGender" :key="trial.idTrial">
       <input type="checkbox" v-bind:id="trial.idTrial" v-bind:name="trial.idTrial" v-bind:value="trial.idTrial" v-model="trialListSelected">
       <label v-bind:for="trial.idTrial"> {{trial.label}} {{trial.gender}}</label><br>
    </div>
  </div>
  <div class="row">
    <button class="btn btn-success btnForm" v-if="!isEditing" @click="addAthlete()" >Inscrire</button>
    <button class="btn btn-warning btnForm" v-else @click="editAthlete()">Modifier</button>
    <span class="textError">{{textError}}</span>
  </div>
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
        trialListSelected : [],
        trialListGender : [],
        textError : ""
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
      isValidAthlete(){
        if(this.newAthlete.lastName == "" || typeof this.newAthlete.lastName == 'undefined')
        {
          return "Veuillez remplir le champ \"Nom\"";
        }
        if(this.newAthlete.firstName == "" || typeof this.newAthlete.firstName == 'undefined')
        {
          return "Veuillez remplir le champ \"Prénom\"";
        }
        if(this.newAthlete.birthYear == ""|| typeof this.newAthlete.birthYear == 'undefined' ||  typeof this.newAthlete.birthYear == 'number')
        {
          return "Veuillez remplir correctement le champ \"Année de naissance\"";
        }
        if(this.newAthlete.club == "" || typeof this.newAthlete.club == 'undefined')
        {
          return "Veuillez remplir le champ \"Club\"";
        }
        if(this.newAthlete.gender == "" || typeof this.newAthlete.gender == 'undefined')
        {
          return "Veuillez remplir le champ \"Genre\"";
        }
        return "";
      },
      addAthlete (){
          let isValidAthlete = this.isValidAthlete()
          if(isValidAthlete == "")
          {
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
          }
          else
          {
            this.textError = isValidAthlete;
          }
      },
      editAthlete(){
          let isValidAthlete = this.isValidAthlete()
          if(isValidAthlete == "")
          {
            axios.put(this.url + "/athlete", this.newAthlete).then((response) =>{
              
              this.editAthleteTrial(this.newAthlete.idAthlete);
              this.$emit("editedAthlete");
              console.log(response.data);
            }).catch((error) =>{
              console.log(error);
            });
          }
          else{
            this.textError = isValidAthlete;
          }
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
      changeListTrialGender(){
        this.trialListSelected = [];
        this.trialListGender = this.trialList.filter(t => t.gender == this.newAthlete.gender)
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
  

  input:valid {
  border: 2px solid #28a745;
  }

  
  
</style>
