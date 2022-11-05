<script setup>
  import { ref } from 'vue';
  const props = defineProps({
    text: String,
    detail: String,
    selected: Boolean,
  }) 

  const selected = ref(props.selected);

  const emit = defineEmits(['clicked'])
  const toggle = () => {
    selected.value = !selected.value;
    emit('clicked')
  }
</script>

<template>
  <div class="inline select-none cursor-pointer" @click="toggle">
    <span class="text-xl " :class="{ 'line-through' : !selected }">{{text}}</span>
    <span class="ml-2 text-sm text-gray-400" :class="{ 'line-through' : !selected }">({{detail}})</span>
  </div>
  
</template>
