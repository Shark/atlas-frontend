<script setup>
import { storeToRefs } from 'pinia';
import useGeneratedImage from '../../stores/generatedImage'
import useGeneratedPrompt from '../../stores/generatedPrompt'
import useImageGenerationStarted from '../../stores/imageGenerationStarted'
import useSelectedPoint from '../../stores/selectedPoint'



const generatedImageStore = useGeneratedImage();
const generatedPromptStore = useGeneratedPrompt();
const imageGenerationStartedStore = useImageGenerationStarted();
const selectedPointStore = useSelectedPoint();
const { image } = storeToRefs(generatedImageStore);

const retryClicked = () => {
  generatedImageStore.reset();
  generatedPromptStore.reset();
  imageGenerationStartedStore.reset();
  selectedPointStore.reset();
}
</script>

<template>
  <div class="flex justify-center items-center h-full flex-col">
    <span>Your generated image:</span>
    <div class="flex justify-center items-center m-8">
      <a :href="image" target="_blank">
        <img :src="image" alt="" class="rounded-md">
      </a>
    </div>
    <button class="bg-blue-400 px-4 py-2 mt-4" @click="retryClicked">Give it another try!</button>
    <span class="text-xs text-gray-500 mt-2">
      Make sure to click the image and store it first! :)
    </span>
  </div>
</template>
