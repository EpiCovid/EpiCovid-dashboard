<template>
  <v-flex style="background-color: black">
    <h3 style="color: white">Total Confirmed</h3>
    <h1 style="color: red">{{total}}</h1>
  </v-flex>
</template>

<script>
export default {
  name: "TotalConfirmed",
  props: ["data"],
  data: function() {
    return {
      total: 0
    }
  },
  // Watcher on data props to re-calc when fetching is done
  watch: {
    data: function() {
      this.calc()
    }
  },
  created() {
    this.calc()
  },
  methods: {
    calc : function() {
      var total = 0
      for (var i = 0; i != this.data.length; i++) {
        total += Number(this.data[i]["attributes"]["Confirmed"])
      }
      this.total = total
    }
  }
};
</script>