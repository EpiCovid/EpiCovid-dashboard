<template>
    <v-card id="box" class="pa-0 ma-1">
        <v-layout column fill-height class="justify-center" id="map_size">
            <template v-if="displayMap">
                <Plotly :data="marker" :layout="layout" :display-mode-bar="false"></Plotly>
            </template>
            <template v-else>
                <img src="https://img.cartoongoodies.com/wp-content/uploads/2019/11/Dora-the-Explorer-Map.png" />
            </template>
        </v-layout>
    </v-card>
</template>

<script>
import { Plotly } from "vue-plotly";

export default {
    name: "Map",
    components: {
        Plotly,
    },
    props: ["data"],
    data: function () {
        return {
            displayMap: true,
            marker: [
                {
                    type: "scattergeo",
                    mode: "markers",
                    lat: [],
                    lon: [],
                    marker: {
                        size: [],
                        colorscale: "Red",
                        color: "Red",
                    },
                    name: "europe data",
                },
            ],
            layout: {
                autosize: true,
                // paper_bgcolor :'#000000',
                //font : {color : '#FFFFFF', size : 11},
                hovermode: "closest",
                margin: { t: 0, b: 0, l: 0, r: 0 },
                geo: {
                    showcountries: true,
                    showframe: false,
                    //showcoastlines: false,
                    scope: "worlds",
                    resolution: 50,
                },
            },
        };
    },
    watch: {
        data: function () {
            this.setMap();
        },
    },
    mounted() {
        this.setMap();
        this.displayMap = true;
    },
    methods: {
        setMap: function () {
            let locations = {
                lat: [],
                lon: [],
            };
            let markerSize = [];
            let size = 0;
            let countryInformation = [];
            let text = "";
            console.log(this.data);
            for (let i = 0; i != this.data.length; i++) {
                text ="";
                // GET ALL LOCATIONS
                locations.lat.push(this.data[i]["attributes"]["Lat"]);
                locations.lon.push(this.data[i]["attributes"]["Long_"]);
                // SET markerSize by Confirmed ratio 15 000 / 17
                size = this.data[i]["attributes"]["Confirmed"] > 15000 ? 15000 : this.data[i]["attributes"]["Confirmed"];
                // SIZE is between [4,17]
                size = Number((size / 15000) * 17) < 4 ? 4 : Number((size / 15000) * 17);
                if (size) {
                    markerSize.push(size);
                }
                if (this.data[i]["attributes"]["Province_State"]) {
                    text = "City: " + this.data[i]["attributes"]["Province_State"] + " ";
                }
                text +=
                    "Country: " +
                    this.data[i]["attributes"]["Country_Region"] +
                    " Confirmed: " +
                    this.data[i]["attributes"]["Confirmed"] +
                    " Deaths: " +
                    this.data[i]["attributes"]["Deaths"] +
                    " Recovered: " +
                    this.data[i]["attributes"]["Recovered"];
                countryInformation.push(text);
            }
            // console.log(locations.lat);
            // console.log(locations.lon);
            this.marker[0].lat = locations.lat;
            this.marker[0].lon = locations.lon;
            this.marker[0].marker.size = markerSize;
            this.marker[0].text = countryInformation;
            this.layout.width = Number(document.getElementById("map_size").offsetWidth);
            this.layout.height = Number(document.getElementById("map_size").offsetHeight);
            return locations;
        },
    },
};
</script>

<style>
@import "../assets/styles/style.css";
</style>
