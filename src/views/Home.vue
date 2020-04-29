<template>
  <v-container fill-height fluid class="pa-2 ma-0">
    <v-snackbar v-model="error">
      <p>Failed to fetch Data</p>
      <v-btn color="red" @click="error = false">Close</v-btn>
    </v-snackbar>
    <!-- <router-link to="/about">Go to About</router-link> -->
    <v-layout column ma-0>
      <v-card id="box" class="pa-0 ma-1">
        <v-layout column class="pa-0 ma-0 justify-space-between">
          <h1 class="main-color" style="text-align: center;">EpiCovid-19</h1>
        </v-layout>
      </v-card>
      <v-row class="pa-0 ma-0">
        <v-layout column class="pa-0 ma-0 col-2">
          <TotalConfirmed style="height: 15vh" :data="data" />
          <CasesByCountry style="max-height: 78%;height: 78%;" :data="data" />
          <LastUpdate style="height: 7%;" :data="data" />
        </v-layout>
        <v-layout column class="pa-0 ma-0 col-6">
          <v-layout row class="pa-0 ma-0" style="height:88%;">
            <v-layout column class="pa-0 ma-0">
              <Map style="height:100%;" :data="data" />
            </v-layout>
          </v-layout>
          <v-layout row class="pa-0 ma-0">
            <v-layout column class="pa-0 ma-0 col-2">
              <TotalCountries style="height:100%;" :data="data" />
            </v-layout>
            <v-layout column class="pa-0 ma-0 col-10">
              <TimeTravel style="height:100%;" v-on:update="update($event)" :data="data"/>
              <!-- <Credits style="height:100%;" :data="data" /> -->
            </v-layout>
          </v-layout>
        </v-layout>
        <v-layout column class="pa-0 ma-0 col-md-4">
          <v-layout row class="pa-0 ma-0" style="height:60%;">
            <v-layout column class="pa-0 ma-0 col-6">
              <TotalDeaths style="height:100%;" :data="data" />
            </v-layout>
            <v-layout column class="pa-0 ma-0 col-6">
              <TotalRecovered style="height:100%;" :data="data" />
            </v-layout>
          </v-layout>
          <Charts style="height:40vh;" :data="data" />
        </v-layout>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import TotalConfirmed from "@/components/TotalConfirmed";
import CasesByCountry from "@/components/CasesByCountry";
import LastUpdate from "@/components/LastUpdate";
import Map from "@/components/Map";
import TotalCountries from "@/components/TotalCountries";
// import Credits from "@/components/Credits";
import TotalDeaths from "@/components/TotalDeaths";
import TotalRecovered from "@/components/TotalRecovered";
import Charts from "@/components/Charts";
import TimeTravel from "@/components/TimeTravel";
export default {
  name: "Home",
  components: {
    TotalConfirmed,
    CasesByCountry,
    LastUpdate,
    Map,
    TotalCountries,
    TotalDeaths,
    TotalRecovered,
    Charts,
    TimeTravel,
  },
  data: function() {
    return {
      data: [],
      error: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData: function(date = null) {
      var query = date ? "?date=" + date : ""
      var url = ""
      process.env.NODE_ENV == "development" ? url = "http://127.0.0.1:8000/covid/" : url = "https://epi-covid-server.herokuapp.com/covid/"
      fetch(url + query)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            this.error = true;
            return;
          }
          this.data = data["data"];
        })
        .catch((/* error */) => {
          this.error = true;
      });
    },
    update: function(time) {
      this.fetchData(time)
    }
  }
};
</script>

<style>
@import "../assets/styles/style.css";
</style>