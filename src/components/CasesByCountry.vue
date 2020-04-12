<template>
  <v-card id="box" class="pa-0 ma-1">
    <v-layout column fill-height class="pa-0 ma-0">
      <h2 class="mt-2 main-color center">Cases by Country</h2>
      <v-layout column style="height: 0vh;">
        <v-flex style="overflow: auto;">
          <v-list class="overflow-y-auto pa-0">
            <v-layout column>
              <span class="row-border py-1" v-for="country of countries" :key="country.region.name">
                <span class="red-color ml-3 mx-1" style="font-weight: bold;">{{ country.confirmed }}</span>
                <span>{{ country.region.name }}</span>
              </span>
            </v-layout>
          </v-list>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-card>
</template>

<script>
export default {
    name: 'CasesByCountry',
    props: ['data'],
    data: function () {
        return {
            countries: [],
        };
    },
    // Watcher on data props to re-calc when fetching is done
    watch: {
        data: function () {
            this.calc();
        },
    },
    created() {
        this.calc();
    },
    methods: {
        numberWithSpaces: function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        },
        calc: function () {
            var countries = [];
            for (var i = 0; i != this.data.length; i++) {
                var tmp = false;
                countries.forEach((item) => {
                    if (item.region.name === this.data[i]['region']['name']) {
                        item.confirmed = parseInt(item.confirmed) + parseInt(this.data[i]['confirmed']);
                        tmp = true;
                    }
                });
                if (!tmp) countries.push(this.data[i]);
            }
            countries = countries.sort(function (a, b) {
                return parseInt(b.confirmed) - parseInt(a.confirmed);
            });
            for (var j = 0; j < countries.length; j++) {
                countries[j].confirmed = this.numberWithSpaces(countries[j].confirmed)
            }
            this.countries = countries
        },
    },
};
</script>

<style>
@import "../assets/styles/style.css";
</style>
