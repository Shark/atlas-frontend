<script setup>
import maplibregl from "maplibre-gl"; // or "const maplibregl = require('maplibre-gl');"
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import useSelectedPoint from "../stores/selectedPoint";
import useSearchStore from "../stores/searchStore";

const selectedPointStore = useSelectedPoint();
const searchStore = useSearchStore();

const { point } = storeToRefs(selectedPointStore);

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
  if (state) {
    if (marker.value) {
      marker.value.remove();
    }
    marker.value = new maplibregl.Marker({ color: "#FFFFFF" })
      .setLngLat(state.point)
      .addTo(map.value);
  }
});

searchStore.$subscribe((mutation, state) => {
  if (state.selectedOption) {
    map.value.flyTo({
      container: "map",
      style: style,
      center: state.selectedOption.center, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
});

onMounted(() => {
  map.value = new maplibregl.Map({
    container: "map",
    style: style,
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });

  map.value.on("load", () => {
    map.value.on("click", function (e) {
      selectedPointStore.set(e.lngLat.lng, e.lngLat.lat);
    });
  });
});
</script>

<template>
  <div
    id="map"
    class="flex-1 relative"
    :class="{
      'pointer-events-none opacity-70': point,
    }"
  >
    <div
      style="position: absolute; left: 50%"
      class="z-10 absolute left-[50%]"
      v-if="!point"
    >
      <div
        class="left-[-50%] relative bg-white rounded-2xl px-4 py-1 font-sans mt-4 font-semibold pointer-events-none select-none"
      >
        Select a point on the map to get started...
      </div>
    </div>
  </div>
</template>
