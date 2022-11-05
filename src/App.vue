<script setup>
import { onMounted, ref } from 'vue';
import useGeneratedImage from './stores/generatedImage'
import Sidebar from './components/sidebar/Sidebar.vue';
import Map from './components/Map.vue';

import JSConfetti from 'js-confetti'

const jsConfetti = ref(null)
onMounted(() => {
  jsConfetti.value = new JSConfetti()
})

const generatedImageStore = useGeneratedImage();

generatedImageStore.$subscribe((mutation, state) => {
  if (state.image) {
    jsConfetti.value.addConfetti()
  }
})
</script>

<template>
  <header></header>

  <main>
    <div class="flex">
      <Sidebar></Sidebar>      
      <Map></Map>
    </div>
  </main>
</template>
