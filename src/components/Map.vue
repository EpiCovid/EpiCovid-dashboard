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
                    showland: true,
                    showocean: true,
                    // showrivers:true,
                    showlakes: true,
                    //showsubunits: true,
                    color: "continent",
                    landcolor: "#2D2D2E",
                    oceancolor:"#0B0B1A",
                    rivercolor:"#746A85",
                    countrycolor: "#7E6798",
                    coastlinecolor: "black",
                    // projection_type: 'mercator',
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
            for (let i = 0; i != this.data.length; i++) {
                text = "";
                size = 0;
                // GET ALL LOCATIONS
                locations.lat.push(this.data[i]["region"]["lat"]);
                locations.lon.push(this.data[i]["region"]["long"]);
                // SET markerSize by Confirmed ratio 15 000 / 17
                size = Number(this.data[i]["confirmed"]) > 15000 ? 15000 : this.data[i]["confirmed"];
                // SIZE is between [4,17]
                size = Number((size / 15000) * 17) < 4 ? 4 : Number((size / 15000) * 17);
                markerSize.push(size);
                if (this.data[i]["region"]["province"]) {
                    text = "City: " + this.data[i]["region"]["province"] + " ";
                }
                text +=
                    "Country: " +
                    this.data[i]["region"]["name"] +
                    " Confirmed: " +
                    this.data[i]["confirmed"] +
                    " Deaths: " +
                    this.data[i]["deaths"] +
                    " Recovered: " +
                    this.data[i]["recovered"];
                countryInformation.push(text);
            }
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
