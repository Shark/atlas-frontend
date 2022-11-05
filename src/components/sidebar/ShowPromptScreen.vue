<script setup>
import { storeToRefs } from 'pinia';
import useGeneratedPrompt from '../../stores/generatedPrompt'
import useImageGenerationStarted from '../../stores/imageGenerationStarted'

const generatedPromptStore = useGeneratedPrompt();
const imageGenerationStarted = useImageGenerationStarted();
const { prompt } = storeToRefs(generatedPromptStore)

const generateButtonClicked = () => {
  imageGenerationStarted.startGeneration()
}
</script>

<template>
  <div class="flex justify-center items-center flex-col h-full">
    <span>{{prompt}}</span>
    <button class="bg-blue-400 px-4 py-2 mt-4" @click="generateButtonClicked">Generate Image</button>
  </div>
</template>
