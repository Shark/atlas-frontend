<template>
  <h1 class="sidebar--header">Love from Paris &lt3</h1>
  <div class="sidebar--section">
    <h2 class="sidebar--section-title">Introduction</h2>
    <div class="sidebar--section-content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </div>
  </div>
  <div class="sidebar--section">
    <h2 class="sidebar--section-title">Upload Image:</h2>
    <div class="sidebar--section-content"><ImageUpload /></div>
  </div>
</template>

<script setup>
import ImageUpload from "./ImageUpload.vue";
</script>

<style>
@import "../../assets/sidebar.css";
</style>
