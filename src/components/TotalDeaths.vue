<template>
    <v-card id="box" class="pa-0 ma-1">
        <v-layout column fill-height class="pa-0 ma-0">
            <h2 class="mt-2 main-color center">Total Deaths</h2>
            <h1 class="mb-2 main-color center" style="line-height: 1.2em; font-size: 48px;">66 666</h1>
            <v-layout column style="height: 0vh;">
                <v-flex style="overflow: auto;">
                    <v-list class="overflow-y-auto pa-0">
                        <v-layout column>
                            <span class="row-border py-1" v-for="country of countries" :key="country.Country_Region">
                                <span class="ml-3" style="font-weight: bold;">
                                    {{ country.Deaths }}
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
    name: 'TotalDeaths',
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
        calc: function () {
            var countries = [];
            for (var i = 0; i != this.data.length; i++) {
                var tmp = false;
                countries.forEach((item) => {
                    if (item.Country_Region === this.data[i]['attributes']['Country_Region']) {
                        item.Deaths = parseInt(item.Deaths) + parseInt(this.data[i]['attributes']['Deaths']);
                        tmp = true;
                    }
                });
                if (!tmp && Number(this.data[i]['attributes']['Deaths']) > 0) countries.push(this.data[i]['attributes']);
            }
            this.countries = countries.sort(function (a, b) {
                return parseInt(b.Deaths) - parseInt(a.Deaths);
            });
        },
    },
};
</script>

<style>
@import '../assets/styles/style.css';
</style>
