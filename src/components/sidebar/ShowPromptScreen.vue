<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import useGeneratedPrompt from "../../stores/generatedPrompt";
import useImageGenerationStarted from "../../stores/imageGenerationStarted";
import SelectableText from "./SelectableText.vue";
import Prompt from "../Prompt.vue";
import Button from "./Button.vue";
import useImageStore from "../../stores/imageStore";

const imageStore = useImageStore();
const { imageDescription } = storeToRefs(imageStore);

const generatedPromptStore = useGeneratedPrompt();
const imageGenerationStarted = useImageGenerationStarted();
const { prompt } = storeToRefs(generatedPromptStore);

const selectedStyle = ref(prompt.value.styles[0]);

const selectedLocations = ref(
  prompt.value.locations.map((location) => ({
    type: location.type,
    name: location.name || location.value,
    selected: location.selected || false,
  }))
);

const selectedFeatures = ref(
  prompt.value.features.map((feature) => ({
    type: feature.type,
    name: feature.name,
    selected: feature.selected || false,
  }))
);

const generateButtonClicked = () => {
  imageGenerationStarted.startGeneration({
    description: imageDescription,
    style: selectedStyle,
    locations: selectedLocations,
    features: selectedFeatures.value.filter(({ selected }) => selected),
  });
};
</script>

<template>
  <div class="sidebar max-h-screen">
    <h1 class="sidebar--header">Prompt Crafter</h1>
    <div class="sidebar--content overflow-scroll">
      <div class="sidebar--section">
        <h2 class="sidebar--section-title">Your prompt:</h2>
        <div class="sidebar--section-content">
          <Prompt
            :description="imageDescription"
            :style="selectedStyle"
            :locations="selectedLocations"
            :features="selectedFeatures"
          ></Prompt>
        </div>
      </div>

      <div class="sidebar--section">
        <h2 class="sidebar--section-title is-style">Style</h2>
        <div class="sidebar--section-content">
          <div class="grid grid-cols-2">
            <div v-for="style in prompt.styles" :key="style">
              <div class="flex justify-center items-center">
                <div
                  class="w-[150px] h-[50px] flex justify-center items-center border-2 rounded-sm text-center mt-2 cursor-pointer"
                  :class="{ 'border-red-300': style === selectedStyle }"
                  @click="selectedStyle = style"
                >
                  <span>{{ style }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sidebar--section">
        <h2 class="sidebar--section-title is-location">Location</h2>
        <div class="sidebar--section-content">
          <div v-for="location in selectedLocations" :key="location.name">
            <SelectableText
              @clicked="location.selected = !location.selected"
              :text="location.type"
              :detail="location.name"
              :selected="location.selected"
            ></SelectableText>
          </div>
        </div>
      </div>

      <div class="sidebar--section">
        <h2 class="sidebar--section-title is-feature">Features</h2>
        <div class="sidebar--section-content">
          <div v-for="feature in selectedFeatures" :key="feature.name">
            <SelectableText
              @clicked="feature.selected = !feature.selected"
              :text="feature.type"
              :detail="feature.name"
              :selected="feature.selected"
            ></SelectableText>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <Button
        @click="generateButtonClicked"
        label="Generate Image"
        :is-fullsize="true"
      />
    </div>
  </div>
</template>

<style>
@import "../../assets/sidebar.css";
</style>
