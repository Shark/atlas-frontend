<template>
  <div class="search">
    <div class="search--header">
      Location:
      <input class="search--input" type="text" v-model="text" />
    </div>

    <ul>
      <li
        class="result"
        v-for="(option, index) in searchStore.options"
        @click="searchStore.selectOption(index)"
      >
        {{ option.place_name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import useSearchStore from "../../stores/searchStore";
const searchStore = useSearchStore();
const text = ref("");

watch(text, () => searchStore.search(text.value));
</script>

<style>
.search {
  border-radius: 4px;
  margin-top: 10px;
  width: 300px;
  background-color: white;
  padding: 10px;
}

.search--header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search--input {
  @apply bg-gray-200;
  flex: 1;
  padding: 4px;
}

.result {
  @apply bg-gray-200;
  width: 100%;
  padding: 6px;
  margin-top: 8px;
  cursor: pointer;
}
</style>
