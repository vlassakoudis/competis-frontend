<template>
<div class="TrialList">
    <table class="table">
        <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Course</th>
                <th scope="col">Genre</th>
                <th scope="col">Date de départ</th>
                <th scope="col">Durée</th>
                <th scope="col">Athlètes</th>
                <th scope="col">Modifier</th>
                <th scope="col">Supprimer</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="trial in trialList" :key="trial">
                <th scope="row">{{trial.idTrial}}</th>
                <td>{{trial.label}}</td>
                <td>{{trial.gender}}</td>
                <td>{{trial.startHour}}</td>
                <td>{{trial.duration}}</td>
                <td><button type="button" class="btn btn-primary">Voir les athletes</button></td>
                <td><button type="button" class="btn btn-warning">Modifier</button></td>
                <td><button type="button" class="btn btn-danger">Supprimer</button></td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'trialListComponent',
  data () {
    return {
        trialList : [],
        url : "http://localhost:3000/api/trial"
    }
  },
  methods : {
      getTrialList(){
          axios.get(this.url).then((response) => {
              this.trialList = response.data;
          }).catch((error) => {
              console.log(error);
          })
      }
  },
  mounted(){
      this.getTrialList();
  }
}
</script>


<style scoped lang="scss">

</style>
