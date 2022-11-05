<script setup>
import maplibregl from "maplibre-gl"; // or "const maplibregl = require('maplibre-gl');"
import { storeToRefs } from "pinia";
import useSearchStore from "../stores/searchStore";
import { onMounted, ref, computed } from "vue";
import useSelectedPoint from "../stores/selectedPoint";
import useMagicMode from "../stores/magicMode";
import Search from "./sidebar/Search.vue";

const searchStore = useSearchStore();
const selectedPointStore = useSelectedPoint();
const magicModeStore = useMagicMode();

const { point } = storeToRefs(selectedPointStore);
const { bounds } = storeToRefs(magicModeStore);
const magicModeActive = computed(() => bounds.value !== null);

const map = ref(null);
const showSearch = ref(false);

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
    if (!state.point) {
      marker.value.remove();
    } else {
      marker.value = new maplibregl.Marker({ color: "#FFFFFF" })
        .setLngLat(state.point)
        .addTo(map.value);
    }
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

const magicModeClicked = () => {
  if (magicModeStore.bounds) {
    magicModeStore.reset();
  } else {
    magicModeStore.set(map.value.getBounds());
  }
};
</script>

<template>
  <div class="grid w-full">
    <div
      id="map"
      class="flex-1 relative grid-overlap"
      :class="{
        'pointer-events-none opacity-70': point || magicModeActive,
      }"
    ></div>
    <div class="grid-overlap z-10 relative pointer-events-none">
      <div
        style="position: absolute; left: 50%"
        v-if="!point && !magicModeActive"
      >
        <div
          class="relative left-[-50%] bg-white rounded-sm px-4 py-1 font-sans mt-4 font-semibold text-sm pointer-events-none select-none shadow-md text-center"
        >
          Select a point on the map to get started..
          <br />
          ...or enable magic mode
        </div>
      </div>

      <div>
        <button
          class="relative ml-4 bg-white rounded-2xl px-4 py-1 font-sans mt-4 font-semibold text-sm shadow-md hover:shadow-lg hover:bg-gray-100 pointer-events-auto"
          @click="magicModeClicked"
          v-if="magicModeActive || (!magicModeActive && !point)"
        >
          <template v-if="magicModeActive">Disable Magic Mode!</template>
          <template v-else>Enable Magic Mode!</template>
        </button>
      </div>

      <div
        class="absolute flex flex-col ml-4 top-5 right-5 justify-end pointer-events-auto"
        v-if="!point && !magicModeActive"
      >
        <button
          @click="showSearch = !showSearch"
          class="rounded-2xl ml-auto w-min px-4 py-1 font-sans font-semibold text-sm shadow-md bg-white hover:shadow-lg hover:bg-gray-100 pointer-events-auto"
        >
          Search
        </button>
        <Search v-if="showSearch" />
      </div>
    </div>
  </div>
</template>

<style>
.grid-overlap {
  grid-area: 1 / 1 / 2 / 2;
}
</style>
