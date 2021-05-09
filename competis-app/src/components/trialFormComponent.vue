<template>
  <div id="formTrial">
  <div class="row">
    <div class="col">
      <label for="label" class="form-label">Label</label>
      <input type="text" class="form-control" id="label" v-model="trial.label" required>
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
          <input class="form-check-input" type="radio" name="genre" value="H" id="homme" v-model="trial.gender" required>
          <label class="form-check-label" for="homme">
          Homme
          </label>
        </div>
        <div class="form-check col">
          <input class="form-check-input" type="radio" name="genre" value="F" id="femme" v-model="trial.gender">
          <label class="form-check-label" for="femme" >
          Femme
          </label>
        </div>
      </div>
    </div>
  </div>
    <button class="btn btn-success" v-if="!isEditing" @click="addTrial()">Ajouter course</button>
    <button class="btn btn-warning" v-else @click="editTrial()">Modifier</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'trialFormComponent',
  data () {
    return {
        url : this.$apiURL,
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
      addTrial (){
          axios.post(this.url + "/trial", this.trial).then((response) =>{
            this.$emit("addedTrial");
            console.log(response.data);
          }).catch((error) =>{
            console.log(error);
          });
      },
      editTrial(){
          axios.put(this.url + "/trial", this.trial).then((response) =>{
            this.$emit("editedTrial");
            console.log(response.data);
          }).catch((error) =>{
            console.log(error);
          });
      }
  }
}
</script>


<style scoped lang="scss">
  button{
    margin-right: 1em;
  }
    input:invalid {
  border: 2px dashed black;
}

  input:valid {
  border: 2px solid #28a745;
}

  
  
</style>
