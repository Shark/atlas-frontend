import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('magicMode', () => {
  const bounds = ref(null);

  const set = (newBounds) => {
    bounds.value = newBounds;
  }

  const reset = () => {
    bounds.value = null;
  }

  return { set, bounds, reset };
})
