<script setup>
import maplibregl from "maplibre-gl"; // or "const maplibregl = require('maplibre-gl');"
import { storeToRefs } from "pinia";
import { onMounted, ref, computed, nextTick } from "vue";
import useSelectedPoint from "../stores/selectedPoint";
import useMagicMode from "../stores/magicMode";
import useMagicModeResult from "../stores/magicModeResult";
import useSearchStore from "../stores/searchStore";
import useCurrentlyGeneratingPrompt from "../stores/currentlyGeneratingPrompt";
import useGeneratedPrompt from "../stores/generatedPrompt";
import useImageGenrationStarted from "../stores/imageGenerationStarted";
import useGeneratedImageStore from "../stores/generatedImage";
import useImageStore from "../stores/imageStore";

import Search from "./sidebar/Search.vue";
import Prompt from "./Prompt.vue";
import Button from "./sidebar/Button.vue";

const searchStore = useSearchStore();
const selectedPointStore = useSelectedPoint();
const magicModeStore = useMagicMode();
const magicModeResultStore = useMagicModeResult();
const imageGenerationStarted = useImageGenrationStarted();
const generatedImageStore = useGeneratedImageStore();
const currentlyGeneratingPromptStore = useCurrentlyGeneratingPrompt();
const generatedPromptStore = useGeneratedPrompt();

const imageStore = useImageStore();
const { imageDescription } = storeToRefs(imageStore);

const { point } = storeToRefs(selectedPointStore);
const { bounds } = storeToRefs(magicModeStore);
const magicModeActive = computed(() => bounds.value !== null);

const htmlPopup = ref(null);

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

const popups = ref([]);

magicModeResultStore.$subscribe((mutation, state) => {
  if (state.result) {
    nextTick(() => {
      state.result.forEach((element, index) => {
        popups.value.push(
          new maplibregl.Popup({ closeOnClick: false })
            .setLngLat(element.lngLat)
            .setDOMContent(document.getElementById(`popup-${index}`))
            .addTo(map.value)
        );
      });
    });
  } else {
    popups.value.forEach((popup) => {
      popup.remove();
    });
    popups.value = [];
  }
});

onMounted(() => {
  map.value = new maplibregl.Map({
    container: "map",
    style: style,
    center: [6.956413, 50.9432175], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });

  map.value.on("load", () => {
    map.value.on("click", function (e) {
      if (!magicModeActive.value) {
        selectedPointStore.set(e.lngLat.lng, e.lngLat.lat);
      }
    });
  });
});

const magicModeClicked = () => {
  if (magicModeStore.bounds) {
    magicModeStore.reset();
    magicModeResultStore.reset();
  } else {
    magicModeStore.set(map.value.getBounds());
  }
};

const mapLocations = (locations) => {
  return locations.map((location) => ({
    type: location.type,
    name: location.value,
    selected: true,
  }));
};

const mapFeatures = (features) => {
  return features
    .map((feature) => ({
      type: feature.type,
      name: feature.name,
      selected: true,
    }))
    .slice(0, 2);
};

const mapFeaturesNonSliced = (features) => {
  return features.map((feature, index) => ({
    type: feature.type,
    name: feature.name,
    selected: index <= 2,
  }));
};

const startMagicImageGeneration = (place) => {
  generatedImageStore.reset();
  imageGenerationStarted.imageGenerationData = {
    style: place.style,
    locations: mapLocations(place.locations),
    features: mapFeatures(place.features),
    description: imageDescription.value,
  };
};

const clickGeneratePrompt = (place) => {
  currentlyGeneratingPromptStore.set(place);
};

const startEdtingMagicPrompt = (place) => {
  generatedImageStore.reset();
  generatedPromptStore.reset();
  imageGenerationStarted.reset();
  generatedPromptStore.set({
    styles: [
      "Photograph",
      "Oil Painting",
      "Modern Drawing",
      "Abstract Drawing",
    ],
    locations: mapLocations(place.locations),
    features: mapFeaturesNonSliced(place.features),
  });
};
</script>

<template>
  <div class="hidden" v-if="magicModeResultStore.result">
    <div v-for="(place, index) in magicModeResultStore.result">
      <div :id="`popup-${index}`" ref="htmlPopup" @click="popupclicked">
        <template v-if="place.features">
          <Prompt
            :small="true"
            :style="place.style"
            :locations="mapLocations(place.locations)"
            :features="mapFeatures(place.features)"
            :description="imageDescription"
          ></Prompt>
          <div class="flex justify-end gap-2">
            <font-awesome-icon
              icon="fa-play"
              size="sm"
              class="border rounded-sm py-2 hover:border-blue-300 cursor-pointer w-[32px]"
              @click="startMagicImageGeneration(place)"
            />
            <font-awesome-icon
              icon="fa-gear"
              size="sm"
              class="border rounded-sm py-2 hover:border-blue-300 cursor-pointer w-[32px]"
              @click="startEdtingMagicPrompt(place)"
            />
          </div>
        </template>
        <div
          v-else-if="
            currentlyGeneratingPromptStore.currentlyGenerating === place
          "
        >
          <font-awesome-icon icon="fa-gear" spin size="2xl" class="py-2 mx-6" />
        </div>
        <div v-else>
          <Button
            :is-danger="false"
            label="Generate Prompt"
            @click="clickGeneratePrompt(place)"
            :disabled="currentlyGeneratingPromptStore.currentlyGenerating"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="grid w-full">
    <div
      id="map"
      class="flex-1 relative grid-overlap"
      :class="{
        'pointer-events-none opacity-70': point,
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
          :disabled="magicModeActive && !magicModeResultStore.result"
          class="relative ml-4 bg-white rounded-2xl px-4 py-1 font-sans mt-4 font-semibold text-sm shadow-md hover:shadow-lg hover:bg-gray-100 pointer-events-auto"
          @click="magicModeClicked"
          v-if="magicModeActive || (!magicModeActive && !point)"
        >
          <template v-if="magicModeActive && !magicModeResultStore.result">
            Enable Magic Mode!
            <font-awesome-icon
              icon="fa-gear"
              size="sm"
              class=""
              spin
            />
          </template>
          <template v-else-if="magicModeActive">Disable Magic Mode!</template>
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
