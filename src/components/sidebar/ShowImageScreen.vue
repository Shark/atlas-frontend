<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import QrcodeVue from "qrcode.vue";
import useGeneratedImage from "../../stores/generatedImage";
import useGeneratedPrompt from "../../stores/generatedPrompt";
import useImageGenerationStarted from "../../stores/imageGenerationStarted";
import useSelectedPoint from "../../stores/selectedPoint";

const generatedImageStore = useGeneratedImage();
const generatedPromptStore = useGeneratedPrompt();
const imageGenerationStartedStore = useImageGenerationStarted();
const selectedPointStore = useSelectedPoint();
const { images } = storeToRefs(generatedImageStore);
const selectedImage = ref(null);

const retryClicked = () => {
  generatedImageStore.reset();
  generatedPromptStore.reset();
  imageGenerationStartedStore.reset();
  selectedPointStore.reset();
};
</script>

<template>
  <Teleport to="body">
    <div v-if="selectedImage" @click="selectedImage = null" class="background">
      <div class="flip-card is-large">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img :src="selectedImage" alt="" class="w-[600px] rounded-md" />
          </div>
          <div class="flip-card-back">
            <qrcode-vue :value="selectedImage" size="600" level="H" />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
  <div class="flex justify-center items-center h-full flex-col">
    <span>Your generated image:</span>
    <div class="flex flex-col gap-1 justify-center items-center m-8">
      <div v-for="image in images">
        <div class="flip-card" @click="selectedImage = image">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img :src="image" alt="" class="rounded-md" />
            </div>
            <div class="flip-card-back">
              <qrcode-vue :value="image" size="200" level="H" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="bg-blue-400 px-4 py-2 mt-4" @click="retryClicked">
      Give it another try!
    </button>
    <span class="text-xs text-gray-500 mt-2">
      Make sure to click the image and store it first! :)
    </span>
  </div>
</template>

<style>
.background {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
}

.flip-card {
  background-color: transparent;
  width: 200px;
  height: 200px;
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

.flip-card.is-large {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: #bbb;
  color: black;
}

/* Style the back side */
.flip-card-back {
  background-color: dodgerblue;
  color: white;
  transform: rotateY(180deg);
}
</style>
