<template>
    <v-card id="box" class="pa-0 ma-1">
        <v-layout column fill-height class="pa-0 ma-0 my-2">
            <h2 class="main-color center">Cases by Country</h2>
        </v-layout>
    </v-card>
</template>

<script>
export default {
    name: "CasesByCountry",
    props: ["data"],
    data: function() {
        return {
            total: 0,
        };
    },
    // Watcher on data props to re-calc when fetching is done
    watch: {
        data: function() {
            this.calc();
        }
    },
    created() {
        this.calc();
    },
    methods: {
        numberWithSpaces: function(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        },
        calc: function() {
            var total = 0;
            for (var i = 0; i != this.data.length; i++) {
                total += Number(this.data[i]["attributes"]["Confirmed"]);
            }
            this.total = this.numberWithSpaces(total);
        }
    }
};
</script>

<style>
@import "../assets/styles/style.css";
</style>