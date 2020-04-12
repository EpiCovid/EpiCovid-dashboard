<template>
    <v-card id="box" class="pa-0 ma-1">
        <v-layout column fill-height class="justify-center align-center pa-0 ma-0">
            <h1 class="main-color center" style="line-height: 1.2em; font-size: 48px;">{{ total }}</h1>
            <span class="main-color center" style="line-height: 1.2em;">Countries</span>
        </v-layout>
    </v-card>
</template>

<script>
export default {
    name: 'TotalCountries',
    props: ['data'],
    data: function () {
        return {
            total: 0,
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
                    if (item === this.data[i]['region']['name']) {
                        tmp = true;
                    }
                });
                if (!tmp) countries.push(this.data[i]['region']['name']);
            }
            this.total = countries.length;
        },
    },
};
</script>

<style>
@import '../assets/styles/style.css';
</style>
