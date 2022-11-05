<template>
  <button
    class="button disabled:bg-gray-200 disabled:border-gray-300"
    :class="{ 'is-danger': isDanger, 'is-fullsize': isFullsize }"
  >
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  isDanger: Boolean,
  isFullsize: Boolean,
  label: String,
});
</script>

<style>
.button {
  padding: 12px 24px;
  border-radius: 4px;
  border: 2px solid lightgrey;
  cursor: pointer;
}

.button.is-fullsize {
  width: 100%;
  margin: 20px;
}

.button:hover {
  @apply border-blue-300;
  border-width: 2px;
}

.button.is-danger:hover {
  @apply border-red-500;
  border-width: 2px;
}

.button.is-danger:active,
.button.is-danger:focus {
  @apply bg-red-500;
}
</style>
