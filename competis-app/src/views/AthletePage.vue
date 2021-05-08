<template>
  <div class="athletePage">
    <headerComponent/>

    <div class="contenu">
      <h1>Athlètes enregistrés</h1>
      <button type="button" class="btn btn-primary" @click="displayForm = true" v-if="!displayForm">Inscrire un athlète</button>
      <button type="button" class="btn btn-secondary" @click="displayForm = false" v-if="displayForm">Annuler</button>
      <athleteFormComponent id="athleteFormComponent" :newAthlete="{}" v-on:addedAthlete="updateAthleteList" v-if="displayForm" :isEditing="false" />
      <athleteListComponent id="athleteListComponent" v-on:editedAthleteForm="displayNotification('L\'athlète a bien été modifié !')"  v-on:deletedAthlete="displayNotification('L\'athlète a bien été supprimé !')" ref="athleteList"/>
    </div>

    <div id="snackbar">{{textNotification}}</div> 

    <footerComponent/>
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
       displayForm : false,
       textNotification : "",
    }
  },
  methods :{
    updateAthleteList(){
      this.displayForm = false;
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

<style>
  #athleteListComponent{
    margin-top: 1em;
  }

  #athleteFormComponent{
    margin-top: 1em;
    margin-bottom: 1em;
    padding: 1em;
    border: 1px solid black;
  }
  
   /* The snackbar - position it at the bottom and in the middle of the screen */
#snackbar {
  visibility: hidden; /* Hidden by default. Visible on click */
  min-width: 250px; /* Set a default minimum width */
  margin-left: -125px; /* Divide value of min-width by 2 */
  background-color: #333; /* Black background color */
  color: #fff; /* White text color */
  text-align: center; /* Centered text */
  border-radius: 2px; /* Rounded borders */
  padding: 16px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  left: 50%; /* Center the snackbar */
  bottom: 30px; /* 30px from the bottom */
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
  visibility: visible; /* Show the snackbar */
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 4.5s;
  animation: fadein 0.5s, fadeout 0.5s 4.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 0; opacity: 0;}
} 
</style>
