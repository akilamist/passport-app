import TextRecognition from '@react-native-ml-kit/text-recognition';

export const extractTextFromImage = async (imagePath) => {
  try {
    // Run text recognition on the image path
    const result = await TextRecognition.recognize(imagePath);

    // Extract recognized text and join as a single string
    const recognizedText = result.blocks.map(block => block.text).join(" ");
    return recognizedText;å
  } catch (error) {
    console.error("Error with ML Kit Text Recognition:", error);
    return null;
  }
};