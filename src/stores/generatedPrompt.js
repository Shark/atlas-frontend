import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('generatedPrompt', () => {
  const prompt = ref(null);


  const set = (newPrompt) => {
    prompt.value = newPrompt;
  }

  const reset = () => {
    prompt.value = null;
  }

  return { prompt, set, reset };
})
