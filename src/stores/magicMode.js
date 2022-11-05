import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('magicMode', () => {
  const magicModeActive = ref(false);

  const enableMagicMode = () => {
    magicModeActive.value = true;
  }

  const reset = () => {
    magicModeActive.value = false;
  }

  return { magicModeActive, enableMagicMode, reset };
})
