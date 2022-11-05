import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('imageGenerationStarted', () => {
  const imageGenerationData = ref(null);

  const startGeneration = (data) => {
    imageGenerationData.value = data;
  }

  const reset = () => {
    imageGenerationData.value = null;
  }

  const getPrompt = () => {
    let string = `A ${imageGenerationData.value.style}`
    string = imageGenerationData.value.locations.reduce((previousValue, currentValue, currentIndex) => {
      return previousValue + ` in the ${currentValue.type} ${currentValue.name}`
    }, string)

    string = imageGenerationData.value.features.reduce((previousValue, currentValue, currentIndex) => {
      if(currentValue.name) {
        return previousValue + ` with ${currentValue.name}`
      }
      return previousValue + ` with a ${currentValue.type}`
    }, string)
    console.log('STRING: ', string)
    return string;
  }

  return { imageGenerationData, startGeneration, reset, getPrompt };
})
