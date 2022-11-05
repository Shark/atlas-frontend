import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('imageStore', () => {
  const maskImageUrl = ref(null);
  const maskImageFile = ref(null);
  const imageDescription = ref("");


  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const getMaskedImage = () => maskImageFile.value ? toBase64(maskImageFile.value): undefined;

  const setMaskImage = (image) => {
    maskImageFile.value = image;
    maskImageUrl.value = URL.createObjectURL(image);
  }
  const removeMaskImage = () => {
    maskImageUrl.value = null;
    maskImageFile.value = null;
    imageDescription = "";

  }

  return { maskImageUrl,imageDescription, setMaskImage, removeMaskImage, getMaskedImage };
})
