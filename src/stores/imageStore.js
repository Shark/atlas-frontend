import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('iamgeStore', () => {
  const maskImageUrl = ref(null);

  const setMaskImage = (url) => {
    maskImageUrl.value = url;
  }
  const removeMaskImage = () => {
    maskImageUrl.value = null;
  }

  return { maskImageUrl, setMaskImage, removeMaskImage };
})
