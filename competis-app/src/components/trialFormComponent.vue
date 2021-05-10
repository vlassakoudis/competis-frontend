<template>
  <div id="formTrial">
  <div class="row">
    <div class="col">
      <label for="label" class="form-label">Épreuve</label>
      <input type="text" class="form-control" placeholder="Épreuve" id="label" v-model="trial.label" required>
    </div>
    <div class="col">
      <label for="startHour" class="form-label">Heure de début</label>
      <input type="time" class="form-control" id="startHour" v-model="trial.startHour" required>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <label for="duration" class="form-label">Durée</label>
      <input type="time" class="form-control" id="duration" v-model="trial.duration" required>
    </div>
    <div class="col" v-if="!isEditing">
      <label class="form-label">Genre</label>
      <div class="row">
        <div class="form-check col">
          <select class="form-control" id="gender" v-model="trial.gender" required>
            <option value="H">Homme</option>
            <option value="F">Femme</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <button class="btn btn-success btnForm" v-if="!isEditing" @click="addTrial()">Ajouter course</button>
    <button class="btn btn-warning btnForm" v-else @click="editTrial()">Modifier</button>
  </div>
  <div class="row">
    <span class="textError">{{textError}}</span>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'trialFormComponent',
  data () {
    return {
        url : this.$apiURL,
        textError : ""
    }
  },
  props: {
      idTrial : Number,
      iTrialList : Number,
      trial : {
            idTrial : '',
            label : '',
            gender : '', 
            startHour : '',
            duration : '',
        },
      isEditing : Boolean,
  },
  methods : {
    isValidTrial(){
        if(this.trial.label == "" || typeof this.trial.label == 'undefined')
        {
          return "Veuillez remplir le champ \"Épreuve\"";
        }
        if(this.trial.startHour == "" || typeof this.trial.startHour == 'undefined')
        {
          return "Veuillez remplir le champ \"Heure de début\"";
        }
        if(this.trial.duration == ""|| typeof this.trial.duration == 'undefined')
        {
          return "Veuillez remplir correctement le champ \"Durée\"";
        }
        if(this.trial.gender == "" || typeof this.trial.gender == 'undefined')
        {
          return "Veuillez remplir le champ \"Genre\"";
        }
        return "";
      },
      addTrial (){
          let isValidTrial = this.isValidTrial();
          if(isValidTrial == "")
          {          
            axios.post(this.url + "/trial", this.trial).then((response) =>{
              this.$emit("addedTrial");
              console.log(response.data);
            }).catch((error) =>{
              console.log(error);
            });
          }
          else
          {
            this.textError = isValidTrial;
          }
      },
      editTrial(){
        let isValidTrial = this.isValidTrial();
        if(isValidTrial == "")
        {
          axios.put(this.url + "/trial", this.trial).then((response) =>{
            this.$emit("editedTrial");
            console.log(response.data);
          }).catch((error) =>{
            console.log(error);
          });
        }
        else{
          this.textError = isValidTrial;
        }
      }
  }
}
</script>


<style scoped lang="scss">
  button{
    margin-right: 1em;
  }
  button{
    margin-right: 1em;
  }
  

  input:valid {
  border: 2px solid #28a745;
  }

  
  
</style>
