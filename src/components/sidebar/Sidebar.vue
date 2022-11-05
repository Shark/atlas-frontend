<script setup>
import WelcomeSidebarScreen from "./WelcomeSidebarScreen.vue";
import GeneratingPromptScreen from "./GeneratingPromptScreen.vue";
import ShowPromptScreen from "./ShowPromptScreen.vue";
import GeneratingImageScreen from "./GeneratingImageScreen.vue";
import ShowImageScreen from "./ShowImageScreen.vue";
import { computed } from "vue";

import useSelectedPoint from "../../stores/selectedPoint";
import useGeneratedPrompt from "../../stores/generatedPrompt";
import useGenerationStarted from "../../stores/imageGenerationStarted";
import useGeneratedImage from "../../stores/generatedImage";

const selectedPointStore = useSelectedPoint();
const generatedPromptStore = useGeneratedPrompt();
const generationStartedStore = useGenerationStarted();
const generatedImageStore = useGeneratedImage();

const screen = computed(() => {
  if (generatedImageStore.image !== null) {
    return ShowImageScreen;
  }
  if (generationStartedStore.imageGenerationData) {
    return GeneratingImageScreen; // #4
  }
  if (generatedPromptStore.prompt !== null) {
    return ShowPromptScreen; // #3
  }
  if (selectedPointStore.point !== null) {
    return GeneratingPromptScreen; // #2
  }
  return WelcomeSidebarScreen; // #2

});
</script>

<template>
  <div id="sidebar" class="w-[400px] shrink-0 shadow-sm bg-white">
    <component :is="screen"></component>
  </div>
</template>
