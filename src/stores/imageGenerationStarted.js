import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('imageGenerationStarted', () => {
  const generationStarted = ref(false);

  const startGeneration = () => {
    generationStarted.value = true;
  }

  const reset = () => {
    generationStarted.value = false;
  }

  return { generationStarted, startGeneration, reset };
})
