<template>
  <div class="">
    <h1>@tlas</h1>
    <div>Beschreibung ...</div>
    <input type="text" v-model="text" />
    <ul>
      <li
        v-for="(option, index) in searchStore.options"
        @click="searchStore.selectOption(index)"
        class="border-solid border-2"
      >
        {{ option.place_name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import useSearchStore from "../../stores/searchStore";
import { ref, watch } from "vue";

const searchStore = useSearchStore();
const text = ref("");

watch(text, () => searchStore.search(text.value));
</script>
