<template>
<button type="button" class="btn btn-danger" v-on:click="deleteAthlete()">Supprimer</button>
</template>

<script>
import axios from 'axios'
export default {
    name: 'deleteAthleteComponent',
  data () {
    return {
        athleteList : [],
        url : "http://localhost:3000/api/athlete/"
    }
  },
  props: {
      idAthlete : Number
  },
  methods : {
      deleteAthlete (){
          axios.delete(this.url).then((response) => {
              console.log(response)
          }).catch((error) => {
              console.log(error);
          })
      }
  },

}
</script>


<style scoped lang="scss">

</style>
