import useSelectedPoint from '../stores/selectedPoint'
import useGeneratedPrompt from '../stores/generatedPrompt'
import useImageGenerationStarted from '../stores/imageGenerationStarted'
import useGeneratedImage from '../stores/generatedImage'
import useMagicMode from '../stores/magicMode'
import useMagicModeResult from '../stores/magicModeResult'
import useCurrentlyGeneratingPrompt from '../stores/currentlyGeneratingPrompt'


function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export default () => {
  const selectedPointStore = useSelectedPoint();
  const generatedPromptStore = useGeneratedPrompt();
  const imageGenerationStartedStore = useImageGenerationStarted();
  const generatedImageStore = useGeneratedImage();
  const magicModeStore = useMagicMode();
  const magicModeResultStore = useMagicModeResult();
  const currentlyGeneratingPromptStore = useCurrentlyGeneratingPrompt();


  selectedPointStore.$subscribe((mutation, state) => {
    if (state.point !== null) {
      fetch(new URL("http://localhost:3000/getSurroundingNodes"), {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          location: {
            longitude: state.point[0],
            latitude: state.point[1],
          }
        })
      }).then((response) => {
        response.json().then((result) => {
          const json = JSON.parse(result)

          const features = json.features.filter(function(item, pos, self) {
            if(pos === 0) return true;
            return self[pos-1].distance !== item.distance;
          })

          generatedPromptStore.set({
            styles: ["Photograph", "Oil Painting", "Modern Drawing", "Abstract Drawing"],
            locations: json.locations,
            features: features,
          })

        })

      })
    }
  })

  const generatePrompt = () => {

  }

  currentlyGeneratingPromptStore.$subscribe((mutation, state) => {
    if (state.currentlyGenerating) {
      console.log(state.currentlyGenerating)
      fetch(new URL("http://localhost:3000/getSurroundingNodes"), {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          location: {
            longitude: state.currentlyGenerating.lngLat[0],
            latitude: state.currentlyGenerating.lngLat[1],
          }
        })
      }
    ).then((res) => res.json().then((res) => {
      const node = JSON.parse(res)
      magicModeResultStore.fillNodeWithData(state.currentlyGenerating, node)
      currentlyGeneratingPromptStore.reset()
    }))
    }
  })

  imageGenerationStartedStore.$subscribe((mutation, state) => {
    if (state.imageGenerationData) {
      fetch(new URL("http://localhost:3000/requestOpenai"), {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          prompt: imageGenerationStartedStore.getPrompt()
        })
      }).then((response) => {
        response.json().then((result) => {
          const json = JSON.parse(result)

          generatedImageStore.set(json.url);
        })
      })
    }
  })

  magicModeStore.$subscribe((mutation, state) => {
    if (state.bounds) {
      console.log(state.bounds)
      fetch(new URL("http://localhost:3000/getPointsByBoundingBox"), {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          "south": state.bounds._sw.lat,
          "west": state.bounds._sw.lng,
          "north": state.bounds._ne.lat,
          "east": state.bounds._ne.lng,
        })
      }).then((response) => {
        response.json().then((result) => {
          const json = JSON.parse(result)

          magicModeResultStore.set(json.map((latLng) => (
            {
              lngLat: [latLng.longitude, latLng.latitude]
            })))
        })
      })
    }
  })
}
