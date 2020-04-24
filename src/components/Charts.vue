<template>
  <v-card id="box" class="pa-0 ma-1">
    <v-layout column fill-height>
      <v-tabs v-model="active_tab_id">
        <v-tab v-for="i in tab" :key="i.id">{{i.text}}</v-tab>
      </v-tabs>
      <v-flex style="overflow: auto;">
        <component v-bind:is="currentTabComponent"></component>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import GoogleTrends from './GoogleTrends.vue';
import Twitter from './Twitter.vue'

export default {
  name: "Charts",
  components: {
    GoogleTrends ,
    Twitter
  },
  props: ["data"],
  data: function() {
    return {
      tab: [
        {id: 0, text: "Google", components: "GoogleTrends"},
        {id: 1, text: "Twitter", components: "Twitter"}
      ],
      active_tab_id: 0,
    };
  },
  // Watcher on data props to re-calc when fetching is done
  watch: {
    data: function() {
      this.calc();
    },
  },
  created() {
    this.calc();
  },
  methods: {
    calc: function() {
    }
  },
  computed: {
    currentTabComponent: function() {
      return this.tab[this.active_tab_id].components
    }
  }
};
</script>

<style>
@import "../assets/styles/style.css";
</style>