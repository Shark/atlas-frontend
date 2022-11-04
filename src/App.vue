<script setup>

import Sidebar from './components/Sidebar.vue';
import Map from './components/Map.vue';
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
