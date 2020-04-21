<template>
  <v-card id="box" class="pa-0 ma-1" :loading="disabled">
    <v-card-title>Time Travel</v-card-title>
    <v-layout class="mr-5 ml-5" column>
      <v-flex>
        <v-slider :min="min" :max="max" v-model="slide" :disabled="disabled" track-color="grey">
          <template v-slot:append>
            <p>{{time}}</p>
          </template>
        </v-slider>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
var dateFormat = require('dateformat');

export default {
  name: "TimeTravel",
  props: ["data"],
  data: function() {
    return {
      min: 1579694400,
      max: Date.now() / 1000,
      slide: Date.now() / 1000,
      time: new Date().toLocaleDateString(),
      debouncedEmit: null,
      disabled: false,
      first: true
    }
  },
  created() {
    this.debouncedEmit = this.debounce(this.emit, 1000, 0)
  },
  watch: {
    slide() {
      this.time = new Date(this.slide * 1000).toLocaleDateString();
      this.first ? this.first = false : this.debouncedEmit();
    },
    data() {
      this.disabled = false;
    },
  },
  methods: {
    debounce(func, wait, immediate) {
      var timeout;
      return function() {
          var context = this, args = arguments;
          var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
          };
          var callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func.apply(context, args);
      }
    },
    emit() {
      var date = dateFormat(new Date(this.slide * 1000), "yyyy-mm-dd")
      dateFormat(new Date(), "yyyy-mm-dd") == date ? date = "" : null
      this.$emit('update', date)
      this.disabled = true;
      return;
    }
  }
}
</script>

<style scoped>
@import "../assets/styles/style.css";
</style>