<template>
<div class="athleteList">
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
            <tr v-for="athlete in athleteList" :key="athlete">
                <th scope="row">{{athlete.idAthlete}}</th>
                <td>{{athlete.lastName}}</td>
                <td>{{athlete.firstName}}</td>
                <td>{{athlete.birthYear}}</td>
                <td>{{athlete.club}}</td>
                <td>{{athlete.gender}}</td>
                <td><button type="button" class="btn btn-primary">Voir les courses</button></td>
                <td><button type="button" class="btn btn-warning">Modifier</button></td>
                <td><deleteAthleteComponent :idAthlete=athlete.idAthlete /></td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import axios from 'axios';
import deleteAthleteComponent from '../components/deleteAthleteComponent.vue';
export default {
    name: 'athleteListComponent',
    components: {
        deleteAthleteComponent
    },
  data () {
    return {
        athleteList : [],
        url : "http://localhost:3000/api/athlete"
    }
  },
  methods : {
      getAthleteList(){
          axios.get(this.url).then((response) => {
              this.athleteList = response.data;
          }).catch((error) => {
              console.log(error);
          })
      }
  },
  mounted(){
      this.getAthleteList();
  }
}
</script>


<style scoped lang="scss">

</style>
