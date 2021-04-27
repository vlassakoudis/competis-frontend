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
          <input class="form-check-input" type="radio" name="genre" value="H" id="homme" v-model="newAthlete.gender">
          <label class="form-check-label" for="homme">
          Homme
          </label>
        </div>
        <div class="form-check col">
          <input class="form-check-input" type="radio" name="genre" value="F" id="femme" v-model="newAthlete.gender">
          <label class="form-check-label" for="femme">
          Femme
          </label>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <ul v-for="trial in trialList" :key="trial">
      <li>{{trial.label}} {{trial.gender}}</li>
    </ul>
  </div>
  <button class="btn btn-success" v-on:click="addAthlete()" >Inscrire</button>

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
        newAthlete : {
          lastName : String,
          firstName : String, 
          birthYear : Number,
          club : String,
          gender : '1'
        }

    }
  },
  props: {
      idAthlete : Number,
      iAthleteList : Number

  },
  methods : {
      addAthlete (){
          axios.post(this.url + "/athlete", this.newAthlete).then((response) =>{
            console.log(response.data);
          }).catch((error) =>{
            console.log(error);
          });
      },
      getTrials(){
        axios.get(this.url + "/trial").then((response) => {
              this.trialList = response.data;
          }).catch((error) => {
              console.log(error);
          });
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
