<template>
  <v-app style="background-color: #F7F7F7;">
    <!-- Top Banner -->
    <!-- <Banner/> -->
    <v-content>
      <!-- Content set to the router view (see @router/views.js) -->
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
// import Banner from './components/Banner';

export default {
  name: 'App',

  components: {
    // Banner
  },

  data: () => ({
    //
  }),
};
</script>

<style>

</style>