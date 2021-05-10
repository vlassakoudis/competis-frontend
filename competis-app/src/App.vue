<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<style >


  #app{
    background-color:#f5f5f5 ;
    min-height: inherit;
  }

  .textError{
    margin-top: 0.5rem;
    margin-left: auto;
    margin-right: auto;
    color : #883c43;
  }

  .btnForm{
    margin-top: 15px !important;
    padding-right: 3rem !important;
    padding-left: 3rem !important;
    margin-left: auto !important;
    margin-right: auto !important;
    font-weight: bold !important;
  }

  /* TABLE */

  
.tableWrapper {
    
    background: #fff;
    padding: 20px 25px;
    border-radius: 3px;
    margin-top: 1em;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
    
}

.tableTitle {
    color: #fff;
    background: #264653;
    padding: 16px 25px;
    margin: -20px -25px 10px;
    border-radius: 3px 3px 0 0;
}

.tableFilter {
    padding: 5px 0 15px;
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 5px;
}


/* NOTIFICATION */


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


/* MODALS */


.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
  max-width: 50%;
  padding: 3rem !important;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
  border-bottom: solid black 1px;
  margin-bottom: 10px !important;
  padding-bottom: 1rem;
}
.modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
 


</style>
