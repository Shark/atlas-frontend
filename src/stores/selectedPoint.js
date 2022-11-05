import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('selectedPoint', () => {
  const point = ref(null);

  const set = (long, lat) => {
    console.log(long, lat)
    point.value = [long, lat];
  }

  return { point, set };
})
