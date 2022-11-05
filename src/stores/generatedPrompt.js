import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('generatedPrompt', () => {
  const prompt = ref(null);

  const set = (newPrompt) => {
    prompt.value = newPrompt;
  }

  return { prompt, set };
})
