<template>
  <v-flex>
    <div id="google"></div>
  </v-flex>
</template>

<script>
import {trends} from "@/assets/trends.js"

export default {
    name: "GoogleTrends",
    data: function() {
        return {
            total: 0,
        };
    },
    mounted: function() {
      trends.embed.renderExploreWidgetTo(document.getElementById("google"), "TIMESERIES", { "comparisonItem": [{ "keyword": "Coronavirus", "geo": "", "time": "today 3-m" }], "category": 0, "property": "" }, { "exploreQuery": "date=today%203-m&q=Coronavirus", "guestPath": "https://trends.google.com:443/trends/embed/" });
    },
};
</script>