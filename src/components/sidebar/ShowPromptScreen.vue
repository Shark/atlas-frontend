<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import useGeneratedPrompt from '../../stores/generatedPrompt'
import useImageGenerationStarted from '../../stores/imageGenerationStarted'
import SelectableText from './SelectableText.vue';

const generatedPromptStore = useGeneratedPrompt();
const imageGenerationStarted = useImageGenerationStarted();
const { prompt } = storeToRefs(generatedPromptStore);

const selectedStyle = ref(prompt.value.styles[0])

const selectedLocations = ref(prompt.value.locations.map(location => ({
  type: location.type,
  name: location.value,
  selected: false,
})))

const selectedFeatures = ref(prompt.value.features.map(feature => ({
  type: feature.type,
  name: feature.value,
  selected: false,
})))

const generateButtonClicked = () => {
  imageGenerationStarted.startGeneration()
}
</script>

<template>
  <h1 class="bg-gray-300 my-2 px-2">Your prompt:</h1>

  <div class="flex justify-center items-center flex-col mb-12 mx-2">
    <div class="inline leading-[30px] text-center" id="prompt">
      <span class="bg-red-300">A {{selectedStyle}}</span>
      <template v-for="location in selectedLocations">
        <span>&nbsp;</span>
        <span v-if="location.selected" class="bg-violet-300">in the {{location.type}} {{location.name}}</span>
      </template>

      <template v-for="feature in selectedFeatures">
        <span>&nbsp;</span>
        <span v-if="feature.selected" class="bg-green-300">with a {{feature.type}}</span>
      </template>
    </div>
  </div>

  <h1 class="bg-red-300 my-2 px-2">Style</h1>
  <div class="grid grid-cols-2">
    <div v-for="style in prompt.styles" :key="style">
      <div class="flex justify-center items-center">
        <div 
          class="w-[150px] h-[50px] flex justify-center items-center border-2 rounded-sm text-center mt-2 cursor-pointer"
          :class="{'border-red-300': style === selectedStyle}"
          @click="selectedStyle = style"
        >
          <span>{{style}}</span>
        </div>
      </div>
    </div>
  </div>

  <h1 class="bg-violet-300 my-2 px-2">Location</h1>
    
  <div v-for="location in selectedLocations" :key="location.name" class="mx-6">
    <SelectableText @clicked="location.selected = !location.selected" :text="location.type" :detail="location.name" :selected="location.selected"></SelectableText>
  </div>

  <h1 class="bg-green-300 my-2 px-2">Features</h1>

  <div v-for="feature in selectedFeatures" :key="feature.name" class="mx-6">
    <SelectableText @clicked="feature.selected = !feature.selected" :text="feature.type" :detail="feature.name" :selected="feature.selected"></SelectableText>
  </div>
  <div class="flex justify-center"><button class="bg-blue-400 px-4 py-2 mt-4" @click="generateButtonClicked">Generate Image</button></div>
</template>

<style>
#prompt span {
  padding: 0.25rem 0.25rem 0.25rem 0.25rem;
}
</style>
