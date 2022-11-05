import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('generatedImage', () => {
  const images = ref([]);

  const set = (newImages) => {
    images.value = newImages;
  }

  const reset = () => {
    images.value = [];
  }

  return { images, set, reset };
})
