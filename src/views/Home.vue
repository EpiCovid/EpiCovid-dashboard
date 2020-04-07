<template>
  <div>
    <v-snackbar v-model="error">
      <p>Failed to fetch Data</p>
      <v-btn color="red" @click="error = false">Close</v-btn>
    </v-snackbar>
    <router-link to="/about">Go to About</router-link>
    <TotalConfirmed v-bind:data="data" />
  </div>
</template>

<script>
import TotalConfirmed from "@/components/TotalConfirmed";
var url = require("url");

export default {
  name: "Home",
  components: {
    TotalConfirmed
  },
  data: function() {
    return {
      data: null,
      error: false
    };
  },
  created() {
    this.fetchData()
    // setInterval(this.fetchData, 1000 * 10) For hot reload
  },
  methods: {
    fetchData: function() {
      var payload = {
        f: "json",
        where: "Confirmed > 0",
        returnGeometry: "false",
        outFields: "*",
        orderByFields: "Confirmed desc",
        resultRecordCount: "1000"
      };
      var query = url.format({ query: payload });
      fetch(
        "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1/query" +
          query
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.error) {
            this.error = true;
            return;
          }
          this.data = data["features"];
        })
        .catch((/* error */) => {
          this.error = true;
        });
    }
  }
};
</script>
