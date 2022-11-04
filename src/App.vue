<script setup>
import maplibregl from "maplibre-gl"; // or "const maplibregl = require('maplibre-gl');"
import { onMounted } from "vue";
const style = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap Contributors",
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm", // This must match the source key above
    },
  ],
};

onMounted(() => {
  const map = new maplibregl.Map({
    container: "map",
    style: style,
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });

  map.on('load', () => {
    map.on('click', function (e) {
      console.log('I WAS CLICKED' , e)
    })
  })
});
</script>

<template>
  <header></header>

  <main>
    <div id="map"></div>
  </main>
</template>
