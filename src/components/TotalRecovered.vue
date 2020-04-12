<template>
    <v-card id="box" class="pa-0 ma-1">
        <v-layout column fill-height class="pa-0 ma-0">
            <h2 class="mt-2 main-color center">Total Recovered</h2>
            <h1 class="mb-2 green-color center" style="line-height: 1.2em; font-size: 48px;">{{ total }}</h1>
            <v-layout column style="height: 0vh;">
                <v-flex style="overflow: auto;">
                    <v-list class="overflow-y-auto pa-0">
                        <v-layout column>
                            <span class="row-border py-1" v-for="country of countries" :key="country.region.name">
                                <span class="green-color ml-3 mx-1" style="font-weight: bold;">
                                    {{ country.recovered }}
                                </span>
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
    name: 'TotalRecovered',
    props: ['data'],
    data: function () {
        return {
            total: 0,
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
                        item.recovered = parseInt(item.recovered) + parseInt(this.data[i]['recovered']);
                        tmp = true;
                    }
                });
                if (!tmp && Number(this.data[i]['recovered']) > 0) countries.push(this.data[i]);
            }
            var total = 0;
            countries.forEach((item) => {
                total += item.recovered;
            });
            this.total = this.numberWithSpaces(total);
            countries = countries.sort(function (a, b) {
                return parseInt(b.recovered) - parseInt(a.recovered);
            });
            for (var j = 0; j < countries.length; j++) {
                countries[j].recovered = this.numberWithSpaces(countries[j].recovered);
            }
            this.countries = countries;
        },
    },
};
</script>

<style>
@import '../assets/styles/style.css';
</style>
