<template>
  <div id="athletePage">
    <headerComponent/>

    <div class="container-sm">
      <div class="tableWrapper">
        <div class="tableTitle">
          <div class="row">
              <div class="col-sm-4">
                <h2>Athlètes enregistrés</h2>
              </div>
              <div class="col-sm-8 inscriptionButton">
                  <button type="button" class="btn btn-light float-right" @click="showModalAdd = true;" >Inscrire un athlète</button>
              </div>
          </div>
        </div>
        <div>
          <athleteListComponent id="athleteListComponent" v-on:editedAthleteForm="displayNotification('L\'athlète a bien été modifié !')"  v-on:deletedAthlete="displayNotification('L\'athlète a bien été supprimé !')" ref="athleteList"/>
        </div>
      </div>

    </div>

    <div id="snackbar">{{textNotification}}</div> 

    <footerComponent/>

        
    <vue-final-modal
      v-model="showModalAdd"
      classes="modal-container"
      content-class="modal-content" >
      <button class="modal__close close" @click=";showModalAdd = false">
            <span aria-hidden="true">&times;</span>
      </button>
      <span class="modal__title">Inscrire un athlète</span>
      <div class="modal__content">
        <athleteFormComponent :newAthlete="{}" v-on:addedAthlete="updateAthleteList" :isEditing="false" />
      </div>
    </vue-final-modal>

    
    
  </div>
</template>

<script>
import headerComponent from '../components/headerComponent.vue';
import footerComponent from '../components/footerComponent.vue';
import athleteListComponent from '../components/athleteListComponent.vue';
import athleteFormComponent from '../components/athleteFormComponent.vue';

export default {

  name: 'AthletePage',
  components: {
    headerComponent,
    footerComponent,
    athleteListComponent,
    athleteFormComponent
  },
  data () {
    return{
       showModalAdd : false,
       textNotification : "",
    }
  },
  methods :{
    updateAthleteList(){
      this.showModalAdd = false;
      this.displayNotification("L'athlète est bien inscrit ! ");
      this.$refs.athleteList.getAthleteList();
    },

    displayNotification(text) {
      this.textNotification = text;
      // Get the snackbar DIV
      var x = document.getElementById("snackbar");

      // Add the "show" class to DIV
      x.className = "show";

      // After 5 seconds, remove the show class from DIV
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    } 


  }
}
</script>

<style scoped>
  #athleteListComponent{
    margin-top: 1em;
  }

  #athleteFormComponent{
    margin-top: 1em;
    margin-bottom: 1em;
    padding: 1em;
    border: 1px solid black;
  }
  

 
::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
  max-width: 50%;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

</style>
