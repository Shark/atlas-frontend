import useSelectedPoint from '../stores/selectedPoint'
import useGeneratedPrompt from '../stores/generatedPrompt'
import useImageGenerationStarted from '../stores/imageGenerationStarted'

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export default () => {
  const selectedPointStore = useSelectedPoint();
  const generatedPromptStore = useGeneratedPrompt();
  const imageGenerationStartedStore = useImageGenerationStarted();

  selectedPointStore.$subscribe((mutation, state) => {
    if (state.point !== null) {
      delay(1000).then(() => {
        const result = 'This is an example prompt';
        generatedPromptStore.set(result)
      });
    }
  })

  imageGenerationStartedStore.$subscribe((mutation, state) => {
    if (state.generationStarted) {
      delay(1000).then(() => {
        
      });
    }
  })
}
