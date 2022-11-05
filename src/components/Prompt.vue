<script setup>
const props = defineProps({
  style: String,
  locations: Array,
  features: Array,
})

</script>

<template>
  <div class="flex justify-center items-center flex-col">
    <div class="inline leading-[30px] text-center" id="prompt">
      <span class="bg-red-300">A {{ style }}</span>
      <template v-for="location in locations">
        <span>&nbsp;</span>
        <span v-if="location.selected" class="bg-violet-300">
          in the {{ location.type }} {{ location.name }}
        </span>
      </template>

      <template v-for="feature in features">
        <span>&nbsp;</span>
        <span v-if="feature.selected" class="bg-green-300">
          with a {{ feature.type }}
        </span>
      </template>
    </div>
  </div>
</template>
