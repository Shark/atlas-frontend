<script setup>
import WelcomeSidebarScreen from "./WelcomeSidebarScreen.vue";
import GeneratingPromptScreen from "./GeneratingPromptScreen.vue";
import ShowPromptScreen from "./ShowPromptScreen.vue";
import GeneratingImageScreen from "./GeneratingImageScreen.vue";
import { ref, computed } from "vue";

import useSelectedPoint from "../../stores/selectedPoint";
import useGeneratedPrompt from "../../stores/generatedPrompt";
import useGenerationStarted from "../../stores/imageGenerationStarted";

const selectedPointStore = useSelectedPoint();
const generatedPromptStore = useGeneratedPrompt();
const generationStartedStore = useGenerationStarted();

const screen = computed(() => {
  if (selectedPointStore.point === null) {
    return WelcomeSidebarScreen; // #1
  }
  if (generatedPromptStore.prompt === null) {
    return GeneratingPromptScreen; // #2
  }
  if (generationStartedStore.generationStarted) {
    return GeneratingImageScreen; // #4
  }
  return ShowPromptScreen; // #3
});
</script>

<template>
  <div id="sidebar" class="w-[400px]">
    <component :is="screen"></component>
  </div>
</template>
