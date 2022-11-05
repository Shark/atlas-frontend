import useSelectedPoint from '../stores/selectedPoint'
import useGeneratedPrompt from '../stores/generatedPrompt'
import useImageGenerationStarted from '../stores/imageGenerationStarted'
import useGeneratedImage from '../stores/generatedImage'
import useMagicMode from '../stores/magicMode'

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export default () => {
  const selectedPointStore = useSelectedPoint();
  const generatedPromptStore = useGeneratedPrompt();
  const imageGenerationStartedStore = useImageGenerationStarted();
  const generatedImageStore = useGeneratedImage();
  const magicModeStore = useMagicMode();

  selectedPointStore.$subscribe((mutation, state) => {
    if (state.point !== null) {
      delay(1000).then(() => {
        const result = 'This is an example prompt';
        generatedPromptStore.set(result)
        generatedPromptStore.set({
          styles: ["Photograph", "Oil Painting", "Modern Drawing", "Abstract Drawing"],
          locations: [
            { type: 'country', value: 'Germany' },
            { type: 'city', value: 'Cologne' },
          ],
          features: [
            { type: 'church', value: 'Cologne Cathedral' },
            { type: 'restaurant', value: 'Steak House' },
          ]
        })
      });
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
        console.log(state);
      });
    }
  })
}
