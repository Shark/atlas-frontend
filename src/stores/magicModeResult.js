import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('magicModeResult', () => {
  const result = ref(null);

  const set = (magicModeResult) => {
    result.value = magicModeResult;
  }

  const reset = () => {
    result.value = null;
  }

  return { set, result, reset };
})
