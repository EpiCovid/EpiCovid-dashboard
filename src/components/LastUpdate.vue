<template>
    <v-card id="box" class="pa-0 ma-1">
        <v-layout column fill-height class="justify-center align-center pa-0 ma-0">
            <h3 class="main-color center" style="line-height: 1.2em; font-weight: normal;">Last Update</h3>
            <h3 class="main-color center" style="line-height: 1.2em; font-weight: bold;">{{ date }}</h3>
        </v-layout>
    </v-card>
</template>

<script>

var dateFormat = require('dateformat');

export default {
    name: 'LastUpdate',
    props: ['data'],
    data: function () {
        return {
            date: 'h',
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
        convertTimestamp: function (tmp) {
            return dateFormat(tmp, 'mm/dd/yyyy h:MM TT');
        },
        calc: function () {
            var tab = [];
            for (var i = 0; i != this.data.length; i++) {
                tab.push(new Date(this.data[i]['last_update']));
            }
            var tmp = tab.sort(function (a, b) {
                return b - a;
            })[0];
            this.date = this.convertTimestamp(tmp);
        },
    },
};
</script>

<style>
@import '../assets/styles/style.css';
</style>
