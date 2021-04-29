<template>
<button type="button" class="btn btn-danger" @click="deleteAthlete()">Désinscrire</button>
</template>

<script>
import axios from 'axios'
export default {
    name: 'deleteAthleteComponent',
  data () {
    return {
        url : this.$apiURL + "/athlete/"
    }
  },
  props: {
      idAthlete : Number,
      iAthleteList : Number

  },
  methods : {
      deleteAthlete (){
          axios.delete(this.url + this.idAthlete).then((response) => {
              this.$emit("deleted",this.iAthleteList);
              console.log(response);
          }).catch((error) => {
              console.log(error);
          })
      }
  },
}
</script>


<style scoped lang="scss">

</style>
