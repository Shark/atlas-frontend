<template>
  <h1 class="sidebar--header">With Love From _ &lt3</h1>
  <div class="sidebar--section">
    <h2 class="sidebar--section-title">Introduction</h2>
    <div class="sidebar--section-content">
      <p>This is a tool which helps you to present you or your product in scenes all around the world! 🌍</p>

      <p class="mt-1">This is how it works:</p>

      <p class="mt-1">
        <b>1. </b> Upload a mask image of choice and describe what it shows in the text box below. You can also skip this step.<br>
        <b>2. </b> Click a point on the map at which you want to show your content.<br>
        <b>3. </b> Modify the prompt to your likings.<br>
        <b>4. </b> Click generate and enjoy! 🎉
      </p>

      <p class="mt-1">
        ...or you can try our magic mode to get location suggestions!
      </p>
    </div>
  </div>
  <div class="sidebar--section">
    <h2 class="sidebar--section-title is-description">Image Description</h2>
    <div class="sidebar--section-content">
      <input
        class="w-full p-2"
        type="text"
        placeholder="Short Description"
        v-model="imageDescription"
      />
    </div>
  </div>
  <div class="sidebar--section">
    <h2 class="sidebar--section-title">Upload Image:</h2>
    <div class="sidebar--section-content"><ImageUpload /></div>
  </div>

</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import ImageUpload from "./ImageUpload.vue";
import useImageStore from "../../stores/imageStore";

const imageStore = useImageStore();
const { imageDescription } = storeToRefs(imageStore);
</script>

<style>
@import "../../assets/sidebar.css";
</style>
