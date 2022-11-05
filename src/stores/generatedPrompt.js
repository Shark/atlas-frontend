import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('generatedPrompt', () => {
  const prompt = ref(null);
  const imageDescription = ref("");


  const set = (newPrompt) => {
    prompt.value = newPrompt;
  }

  const reset = () => {
    prompt.value = null;
  }

  return { prompt, imageDescription, set, reset };
})
