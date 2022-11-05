import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('currentlyGeneratingPrompt', () => {
  const currentlyGenerating = ref(null);

  const set = (currentlyGeneratingLngLat) => {
    currentlyGenerating.value = currentlyGeneratingLngLat;
  }

  const reset = () => {
    currentlyGenerating.value = null;
  }

  return { currentlyGenerating, set, reset };
})
