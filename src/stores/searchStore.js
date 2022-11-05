import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore('searchStore', () => {
  const options = ref([]);
  const selectedOption = ref(null);
  
  const controller = ref(null);

  const searchPlaces = async (text) => {
    options.value = [];
    if(controller.value){
      controller.value.abort();
    }
    try {
      let request =
        "https://nominatim.openstreetmap.org/search?q=" +
        text +
        "&format=geojson&polygon_geojson=1&addressdetails=1";
      controller.value = new AbortController();
      const response = await fetch(request, {signal: controller.value.signal});
      const geojson = await response.json();
      for (let feature of geojson.features) {
        if(options.value.length > 10) continue;
        let center = [
          feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
          feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2,
        ];
        let point = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: center,
          },
          place_name: feature.properties.display_name,
          properties: feature.properties,
          text: feature.properties.display_name,
          place_type: ["place"],
          center: center,
        };
        options.value.push(point);
      }
    } catch (e) {
      
    }
  }

  function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  const selectOption = (index) => {
    selectedOption.value = options.value[index];
  }

  const search = (text) => {
    debounce(searchPlaces)(text);
  }

  return { options,selectedOption,  search, selectOption};
})
