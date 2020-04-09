<template>
    <v-card id="box" class="pa-0 ma-1">
        <v-layout column fill-height class="pa-0 ma-0">
            <h2 class="mt-2 main-color center">Cases by Country</h2>
            <v-layout column style="height: 0vh;">
                <v-flex style="overflow: auto;">
                    <v-list class="overflow-y-auto pa-0">
                        <v-layout column>
                            <span class="row-border py-1" v-for="country of countries" :key="country.Country_Region">
                                <span class="red-color ml-3 mx-1" style="font-weight: bold;">
                                    {{ country.Confirmed }}
                                </span>
                                <span>{{ country.Country_Region }}</span>
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
                    if (item.Country_Region === this.data[i]['attributes']['Country_Region']) {
                        item.Confirmed = parseInt(item.Confirmed) + parseInt(this.data[i]['attributes']['Confirmed']);
                        tmp = true;
                    }
                });
                if (!tmp) countries.push(this.data[i]['attributes']);
            }
            countries = countries.sort(function (a, b) {
                return parseInt(b.Confirmed) - parseInt(a.Confirmed);
            });
            for (var j = 0; j < countries.length; j++) {
                countries[j].Confirmed = this.numberWithSpaces(countries[j].Confirmed)
            }
            this.countries = countries
        },
    },
};
</script>

<style>
@import '../assets/styles/style.css';
</style>
