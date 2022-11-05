import useSelectedPoint from '../stores/selectedPoint'
import useGeneratedPrompt from '../stores/generatedPrompt'
import useImageGenerationStarted from '../stores/imageGenerationStarted'
import useGeneratedImage from '../stores/generatedImage'
import useMagicMode from '../stores/magicMode'
import useMagicModeResult from '../stores/magicModeResult'

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

  const url = new URL("http://localhost:3000/getSurroundingNodes")

  selectedPointStore.$subscribe((mutation, state) => {
    if (state.point !== null) {
      console.log('POINT')
      fetch(url, {
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
      }).then((result) => {
        console.log('RESULT! ', result)
      })
      // delay(1000).then(() => {
      //   const result = 'This is an example prompt';
      //   generatedPromptStore.set(result)
      //   generatedPromptStore.set({
      //     styles: ["Photograph", "Oil Painting", "Modern Drawing", "Abstract Drawing"],
      //     locations: [
      //       { type: 'country', value: 'Germany' },
      //       { type: 'city', value: 'Cologne' },
      //     ],
      //     features: [
      //       { type: 'church', value: 'Cologne Cathedral' },
      //       { type: 'restaurant', value: 'Steak House' },
      //     ]
      //   })
      // });
    }
  })

  imageGenerationStartedStore.$subscribe((mutation, state) => {
    if (state.generationStarted) {
      delay(1000).then(() => {
        const image = 'https://i.pinimg.com/originals/6e/71/05/6e7105058a0d653a79c82fc35a8c5977.jpg'
        generatedImageStore.set(image);
      });
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
