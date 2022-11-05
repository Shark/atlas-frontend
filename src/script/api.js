import useSelectedPoint from '../stores/selectedPoint'
import useGeneratedPrompt from '../stores/generatedPrompt'
import useImageGenerationStarted from '../stores/imageGenerationStarted'
import useGeneratedImage from '../stores/generatedImage'
import useMagicMode from '../stores/magicMode'
import useMagicModeResult from '../stores/magicModeResult'
import useImageStore from '../stores/imageStore'


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
  const imageStore = useImageStore();

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
            description: generatedPromptStore.imageDescription
          })

        })

      })
    }
  })


  imageGenerationStartedStore.$subscribe(async (mutation, state) => {
    if (state.imageGenerationData) {
      const maskedImage = await imageStore.getMaskedImage();
      const images = maskedImage ? {full: maskedImage,
        masked: maskedImage} : undefined;
      fetch(new URL("http://localhost:3000/requestOpenai"), {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          prompt: imageGenerationStartedStore.getPrompt(),
          images
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
      delay(1000).then(() => {
        const result = [{
          lngLat: ['6.956413', '50.9432175'],
          style: "Oil Painting",
          locations: [
            { type: 'country', value: 'Germany' },
            { type: 'city', value: 'Cologne' },
          ],
          features: [
            { type: 'church', value: 'Cologne Cathedral' },
            { type: 'restaurant', value: 'Steak House' },
          ]
        }]
        magicModeResultStore.set(result)
      });
    }
  })
}
