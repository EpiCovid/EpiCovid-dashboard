<template>
  <v-flex>
    <v-snackbar v-model="error" dark>
      <p>Error while fetching data</p>
      <v-btn @click="error = false">Close</v-btn>
    </v-snackbar>
    <v-layout justify-center>
      <div class="loading" id="loading">
        <v-text-field
          label="Search a word"
          v-model="search"
          append-icon="mdi-magnify"
          class="pt-4"
          @click:append="reload()"
          v-on:keyup.enter="reload()"
        ></v-text-field>
        <div id="tweetsDiv"></div>
      </div>
    </v-layout>
  </v-flex>
</template>

<script>
window.twttr = (function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
  t._e = [];
  t.ready = function (f) {
    t._e.push(f);
  };
  return t;
}(document, "script", "twitter-wjs"));

export default {
  name: "Twitter",
  data() {
    return {
      error: false,
      search: "Covid-19"
    }
  },
  created() {
    this.fetch_tweet()
  },
  methods: {
    async fetch_tweet() {
      var url = ""
      process.env.NODE_ENV == "development" ? url = "http://127.0.0.1:8000" : url = "https://epi-covid-server.herokuapp.com"
      fetch(url + "/twitter/" + this.search)
      .then((response) => response.json())
      .then(async (data) => {
        const div = document.getElementById("tweetsDiv")
        div.innerHTML = data["html"]
        window.twttr.widgets.load()
        const loadingDiv = document.getElementById("loading");
        loadingDiv.setAttribute("class", "")
      })
      .catch(() => {
        this.error = true
        const div = document.getElementById("tweetsDiv")
        div.innerHTML += "Error"
        const loadingDiv = document.getElementById("loading");
        loadingDiv.setAttribute("class", "")
      })
    },
    reload() {
      const loadingDiv = document.getElementById("loading");
      loadingDiv.setAttribute("class", "loading");
      this.fetch_tweet();
    }
  }
}
</script>

<style scoped>
.loading {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #454749;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  align-self: center;
  animation: spin 2s linear infinite;
}

.loading * {
  display: none;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>