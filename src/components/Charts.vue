<template>
    <v-card id="box" class="pa-0 ma-1">
        <v-layout column fill-height class="justify-center align-center pa-0 ma-0">
        </v-layout>
    </v-card>
</template>

<script>
export default {
    name: "Charts",
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
        calc: function() {
        }
    }
};
</script>

<style>
@import "../assets/styles/style.css";
</style>