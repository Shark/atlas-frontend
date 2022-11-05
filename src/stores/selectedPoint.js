import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('selectedPoint', () => {
  const point = ref(null);

  const set = (long, lat) => {
    point.value = [long, lat];
  }

  const reset = () => {
    point.value = null;
  }

  return { point, set, reset };
})
