import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('imageGenerationStarted', () => {
  const generationStarted = ref(null);

  const startGeneration = () => {
    generationStarted.value = true;
  }

  return { generationStarted, startGeneration };
})
