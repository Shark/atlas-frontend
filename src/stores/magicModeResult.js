import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('magicModeResult', () => {
  const result = ref(null);

  const set = (magicModeResult) => {
    result.value = magicModeResult;
  }

  const fillNodeWithData = (source, node) => {
    const index = result.value.findIndex((element) => element === source);
    result.value[index] = {
      lngLat: result.value[index].lngLat,
      locations: node.locations,
      features: node.features,
      style: "Oil Painting"
    }
  }

  const reset = () => {
    result.value = null;
  }

  return { set, result, reset, fillNodeWithData };
})
