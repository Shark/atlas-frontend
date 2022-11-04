<script setup>
import WelcomeSidebarScreen from './WelcomeSidebarScreen.vue'
import GeneratingPromptScreen from './GeneratingPromptScreen.vue'
import { ref, computed } from 'vue';

import useSelectedPoint from '../../stores/selectedPoint'

const selectedPointStore = useSelectedPoint();

const screen = computed(() => {
  console.log(selectedPointStore.point)

  if(selectedPointStore.point === null) {
    return WelcomeSidebarScreen;
  }
  return GeneratingPromptScreen;
})
</script>

<template>
  <div id="sidebar" class="w-[400px]">
    <component :is="screen"></component>
  </div>
</template>
