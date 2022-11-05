<script setup>
const props = defineProps({
  style: String,
  description: String,
  locations: Array,
  features: Array,
  small: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="flex justify-center items-center flex-col"
    :class="{ 'text-xs': small }"
  >
    <div
      class="inline text-center"
      :class="{ 'leading-[20px]': small, 'leading-[30px]': !small }"
      :id="{ prompt: !small, 'prompt-small': small }"
    >
      <span class="bg-red-300">A {{ style }}</span>
      <span v-if="description && description.length > 0">&nbsp;</span>
      <span v-if="description && description.length > 0" class="bg-fuchsia-300">
        of a {{ description }}
      </span>
      <template v-for="location in locations">
        <span>&nbsp;</span>
        <span v-if="location.selected" class="bg-teal-300">
          in the {{ location.type }} {{ location.name }}
        </span>
      </template>

      <template v-for="feature in features">
        <span>&nbsp;</span>
        <span v-if="feature.selected && !feature.name" class="bg-violet-300">
          with a {{ feature.type }}
        </span>
        <span
          v-else-if="feature.selected && feature.name"
          class="bg-violet-300"
        >
          with {{ feature.name }}
        </span>
      </template>
    </div>
  </div>
</template>

<style>
#prompt span {
  padding: 0.25rem 0.25rem 0.25rem 0.25rem;
}

#prompt-small span {
  padding: 0.1rem 0.1rem 0.1rem 0.1rem;
}
</style>
