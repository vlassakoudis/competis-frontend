<template>
<div class="bandTitle">
    <h2>{{title}}</h2>
    <p>{{text}}</p>
</div>
</template>

<script>
export default {
  name: 'bandTitle',
  props: {
      title : String, 
      text : String
  }
}
</script>


<style scoped lang="scss">
    .bandTitle{
        background-color : #2A9D8F ;
        color :  #fff;
    }
</style>
