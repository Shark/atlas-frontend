<template>
  <div class="image-upload">
    <label v-if="maskImageUrl" id="preview" for="image-upload">
      <img class="image-upload--image" :key="url" :src="maskImageUrl" />
    </label>
    <div
      v-if="!maskImageUrl"
      class="image-upload--wrapper"
      :class="{ 'has-error': !!error }"
    >
      <label for="iamge-upload" class="image-upload--label">
        <font-awesome-icon
          icon="fa-image"
          class="image-upload--icon"
          :class="{ 'has-error': !!error }"
          size="9x"
        />
        <span v-if="!error">Add Image</span>
        <span v-if="error">{{ error }}</span>
      </label>
      <input
        type="file"
        class="image-upload--input"
        id="image-upload"
        @change="onDrop"
      />
    </div>
    <div v-if="maskImageUrl">
      <button class="image-upload--remove" @click="removeImage()">
        Remove image
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useImageStore from "../../stores/imageStore";
import { storeToRefs } from "pinia";

const imageStore = useImageStore();
const { maskImageUrl } = storeToRefs(imageStore);

const error = ref(null);
const onDrop = (e) => {
  error.value = null;
  if (e.target.files[0].type !== "image/png") {
    error.value = "You can only add '.png' files";
    return;
  }
  imageStore.setMaskImage(URL.createObjectURL(e.target.files[0]));
};

const removeImage = () => {
  imageStore.removeMaskImage();
  error.value = null;
};
</script>

<style>
.image-upload {
  padding: 0;
  margin: 0;
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
}

.image-upload--wrapper {
  width: 300px;
  height: 300px;
  border: dashed 4px black;
  background-color: lightgray;
  position: relative;
}

.image-upload.has-error {
  border-color: red;
}

.image-upload--label {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max-content;
}

.image-upload--input {
  opacity: 0;
  -moz-opacity: 0;
  width: 100%;
  height: 100%;
  filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0);
  border: solid 4px black;
}

.image-upload--icon.has-error {
  color: red;
}

.image-upload--image {
  width: 300px;
  height: 300px;
  border: dashed 4px black;
  padding: 16px;
  background-color: lightgray;
}

.image-upload--remove {
  padding: 4px 8px;
  border-radius: 4px;
  border: 2px solid red;
}
</style>
