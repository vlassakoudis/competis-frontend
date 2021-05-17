<template>
  <div class="TrialPage">
    <headerComponent/>

      <div class="container-sm" role="content">
      <div class="tableWrapper">
        <div class="tableTitle">
          <div class="row">
              <div class="col-sm-4">
                <h2>Épreuves enregistrées</h2>
              </div>
              <div class="col-sm-8 inscriptionButton">
                  <button type="button" class="btn btn-light float-right" @click="showModalAdd = true;" >Ajouter une course</button>
              </div>
          </div>
        </div>
        <div>
          <trialListComponent id="trialListComponent" v-on:editedTrialForm="displayNotification('L\'épreuve a bien été modifiée !')" v-on:deletedTrial="displayNotification('L\' épreuve a bien été supprimée !')" ref="trialForm" />
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
      <span class="modal__title">Ajouter une épreuve</span>
      <div class="modal__content">
        <trialFormComponent :trial="{}" v-on:addedTrial="updateTrialList" :isEditing="false" />
      </div>
    </vue-final-modal>


  </div>
</template>

<script>
import headerComponent from '../components/headerComponent.vue';
import footerComponent from '../components/footerComponent.vue';
import trialListComponent from '../components/trialListComponent.vue';
import trialFormComponent from '../components/trialFormComponent.vue';

export default {
  name: 'TrialPage',
  components: {
    headerComponent,
    footerComponent,
    trialListComponent,
    trialFormComponent
  },
  data () {
    return{
       showModalAdd : false,
       textNotification : "",
    }
  },
  methods : {
    updateTrialList(){
      this.showModalAdd = false;
      this.displayNotification("La course est bien enregistrée ! ");
      this.$refs.trialForm.getTrialList();
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

  },
  created(){
    document.title = "Gestion des épreuves";
  }
}
</script>
<style scoped>
 #trialListComponent{
    margin-top: 1em;
  }

  #trialFormComponent{
    margin-top: 1em;
    margin-bottom: 1em;
    padding: 1em;
    border: 1px solid black;
  }
  
</style>
