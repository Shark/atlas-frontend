<template>
  <div class="header"><span>Love from Paris &lt3</span></div>
  <div class="section">
    <h2 class="section-title">Introduction</h2>
    <div class="section-content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </div>
  </div>
  <div class="section">
    <h2 class="section-title">Upload Image:</h2>
    <div class="section-content"><ImageUpload /></div>
  </div>
</template>

<script setup>
import ImageUpload from "./ImageUpload.vue";
</script>

<style>
.header {
  width: 360px;
  margin: 20px 40px;
  font-size: 32px;
}
.section-title {
  @apply bg-cyan-600;
  font-size: 18px;
  width: 100%;
  padding: 4px 12px;
  margin-bottom: 20px;
}
.section-content {
  width: 100%;
  padding: 0 12px;
  margin-bottom: 20px;
}
</style>
