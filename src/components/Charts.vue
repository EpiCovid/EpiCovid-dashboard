<template>
  <v-card id="box" class="pa-0 ma-1">
    <v-flex>
    <!-- <v-layout column fill-height class="justify-center align-center pa-0 ma-0"> -->
       <div id="google"></div>
    </v-flex>
    <!-- </v-layout> -->
  </v-card>
</template>

<script>

</script>

<script>
import {trends} from "@/assets/trends.js"

export default {
    name: "Charts",
    props: ["data"],
    data: function() {
        return {
            total: 0,
        };
    },
    mounted: function() {
      trends.embed.renderExploreWidgetTo(document.getElementById("google"), "TIMESERIES", { "comparisonItem": [{ "keyword": "Coronavirus", "geo": "", "time": "today 3-m" }], "category": 0, "property": "" }, { "exploreQuery": "date=today%203-m&q=Coronavirus", "guestPath": "https://trends.google.com:443/trends/embed/" });
    },
    // Watcher on data props to re-calc when fetching is done
    watch: {
        data: function() {
            this.calc();
        }
    },
    created() {
      this.calc();
    },
    methods: {
        calc: function() {
        }
    }
};
</script>

<style>
@import "../assets/styles/style.css";
</style>