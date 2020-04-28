<template>
  <v-flex>
    <v-layout justify-center>
      <div>
      <v-text-field
        label="Keyword"
        v-model="keyword"
        append-icon="mdi-magnify"
        class="pt-4"
        @click:append="load()"
        v-on:keyup.enter="load()"
      ></v-text-field>
      </div>
    </v-layout>
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
      keyword: "Coronavirus"
    };
  },
  mounted: function() {
    this.load()
  },
  methods: {
    load() {
      const div = document.getElementById("google");
      div.innerHTML = "";
      trends.embed.renderExploreWidgetTo(document.getElementById("google"), "TIMESERIES", { "comparisonItem": [{ "keyword": this.keyword, "geo": "", "time": "today 3-m" }], "category": 0, "property": "" }, { "exploreQuery": "date=today%203-m&q=" + this.keyword, "guestPath": "https://trends.google.com:443/trends/embed/" });
    }
  }
};
</script>