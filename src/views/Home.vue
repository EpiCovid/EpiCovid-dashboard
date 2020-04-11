<template>
    <v-container fill-height fluid class="pa-2 ma-0">
        <v-snackbar v-model="error">
            <p>Failed to fetch Data</p>
            <v-btn color="red" @click="error = false">Close</v-btn>
        </v-snackbar>
        <!-- <router-link to="/about">Go to About</router-link> -->
        <v-layout column ma-0>
            <v-card id="box" class="pa-0 ma-1">
                <v-layout column class="pa-0 ma-0 justify-space-between">
                    <h1 class="main-color" style="text-align: center;">EpiCovid-19</h1>
                </v-layout>
            </v-card>
            <v-row class="pa-0 ma-0">
                <v-layout column class="pa-0 ma-0 col-2">
                    <TotalConfirmed style="height: 15%;" :data="data" />
                    <CasesByCountry style="max-height: 78%;height: 78%;" :data="data" />
                    <LastUpdate style="height: 7%;" :data="data" />
                </v-layout>
                <v-layout column class="pa-0 ma-0 col-6">
                    <v-layout row class="pa-0 ma-0" style="height:88%;">
                        <v-layout column class="pa-0 ma-0">
                            <Map style="height:100%;" :data="data" />
                        </v-layout>
                    </v-layout>
                    <v-layout row class="pa-0 ma-0" style="height:12%;">
                        <v-layout column class="pa-0 ma-0 col-2">
                            <TotalCountries style="height:100%;" :data="data" />
                        </v-layout>
                        <v-layout column class="pa-0 ma-0 col-10">
                            <Credits style="height:100%;" :data="data" />
                        </v-layout>
                    </v-layout>
                </v-layout>
                <v-layout column class="pa-0 ma-0 col-md-4">
                    <v-layout row class="pa-0 ma-0" style="height:60%;">
                        <v-layout column class="pa-0 ma-0 col-6">
                            <TotalDeaths style="height:100%;" :data="data" />
                        </v-layout>
                        <v-layout column class="pa-0 ma-0 col-6">
                            <TotalRecovered style="height:100%;" :data="data" />
                        </v-layout>
                    </v-layout>
                    <Twitter />
                    <Charts style="height:40%;" :data="data" />
                </v-layout>
            </v-row>
        </v-layout>
    </v-container>
</template>

<script>
import TotalConfirmed from "@/components/TotalConfirmed";
import CasesByCountry from "@/components/CasesByCountry";
import LastUpdate from "@/components/LastUpdate";
import Map from "@/components/Map";
import TotalCountries from "@/components/TotalCountries";
import Credits from "@/components/Credits";
import TotalDeaths from "@/components/TotalDeaths";
import TotalRecovered from "@/components/TotalRecovered";
import Charts from "@/components/Charts";
import Twitter from "@/components/Twitter";

var url = require("url");

export default {
    name: "Home",
    components: {
        TotalConfirmed,
        CasesByCountry,
        LastUpdate,
        Map,
        TotalCountries,
        Credits,
        TotalDeaths,
        TotalRecovered,
        Charts,
        Twitter
    },
    data: function() {
        return {
            data: [],
            error: false
        };
    },
    created() {
        this.fetchData();
        // setInterval(this.fetchData, 1000 * 10) For hot reload
    },
    methods: {
        fetchData: function() {
            //   alert("in fetch data")
            var payload = {
                f: "json",
                where: "Confirmed > 0",
                returnGeometry: "false",
                outFields: "*",
                orderByFields: "Confirmed desc",
                resultRecordCount: "1000"
            };
            var query = url.format({ query: payload });
            fetch(
                "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/ArcGIS/rest/services/Coronavirus_2019_nCoV_Cases/FeatureServer/1/query" +
                    query
            )
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.error) {
                        this.error = true;
                        return;
                    }
                    this.data = data["features"];
                })
                .catch((/* error */) => {
                    this.error = true;
                });
        }
    }
};
</script>

<style>
@import "../assets/styles/style.css";
</style>