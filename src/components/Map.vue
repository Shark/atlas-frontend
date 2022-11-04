<script setup>
import maplibregl from "maplibre-gl"; // or "const maplibregl = require('maplibre-gl');"
import { onMounted, ref } from "vue";
import useSelectedPoint from '../stores/selectedPoint'

const selectedPointStore = useSelectedPoint();
console.log(selectedPointStore)

const map = ref(null);

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

const marker = ref(null);

selectedPointStore.$subscribe((mutation, state) => {
  if(state) {
    if(marker.value) {
      marker.value.remove();
    }
    marker.value = new maplibregl.Marker({color: "#FFFFFF"})
      .setLngLat(state.point)
      .addTo(map.value);
  }
})

onMounted(() => {
  map.value = new maplibregl.Map({
    container: "map",
    style: style,
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });

  map.value.on('load', () => {
    map.value.on('click', function (e) {
      console.log('I WAS CLICKED' , e)
      selectedPointStore.set(e.lngLat.lng, e.lngLat.lat)
    })
  })
});
</script>

<template>
  <div id="map" class="flex-1"></div>
</template>
