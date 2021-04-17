<template>
<div class="header">
  <nav class="navbar navbar-expand-md">
    <div class="container-fluid">
      <span class="navbar-brand">COMPETIS</span>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/athlete" class="nav-link">Athlètes</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/trial" class="nav-link">Épreuves</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  name: 'headerComponent',
}
</script>


<style scoped lang="scss">

.nav-link
{
  color : #fff ;

  &.router-link-exact-active{
    color : #264653 !important;
    background-color: #F4A261;
  }
}

.nav-link:hover
{
  color: #F4A261;
}

.navbar 
{
  background-color : #264653 ;
  color : #fff ;
}



</style>
