import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('generatedImage', () => {
  const image = ref(null);

  const set = (newImage) => {
    image.value = newImage;
  }

  const reset = () => {
    image.value = null;
  }

  return { image, set, reset };
})
