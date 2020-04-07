<template>
    <v-card id="box" class="pa-0 ma-1">
        <v-layout column fill-height class="justify-center align-center pa-0 ma-0">
            <h3 class="main-color center" style="line-height: 1.2em; font-weight: normal;">Last Update</h3>
            <h3 class="main-color center" style="line-height: 1.2em; font-weight: bold;">01/01/2000</h3>
        </v-layout>
    </v-card>
</template>

<script>
export default {
    name: "LastUpdate",
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