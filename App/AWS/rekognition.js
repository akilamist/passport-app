import AWS from 'aws-sdk';
import { Buffer } from 'buffer';

AWS.config.update({
  region: 'ap-south-1',
  accessKeyId: 'AKIAYHJAM7GYJKU2LQDG',
  secretAccessKey: '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',
});

const rekognition = new AWS.Rekognition();

// Function to fetch and convert image to bytes
const fetchImageAsBytes = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl); // Fetch the image from URL
    const arrayBuffer = await response.arrayBuffer(); // Convert response to ArrayBuffer
    return Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer
  } catch (error) {
    console.error("Error fetching image:", error);
    throw new Error("Image conversion failed");
  }
};

// Function to compare images with Rekognition
export const compareImages = async (sourceImageUrl, targetImageUrl) => {
  console.log('targetImageUrl: ', targetImageUrl);
  console.log('sourceImageUrl: ', sourceImageUrl);
  try {
    // Convert images to byte arrays
    const sourceImageBytes = await fetchImageAsBytes(sourceImageUrl);
    const targetImageBytes = await fetchImageAsBytes(targetImageUrl);

    const params = {
      SourceImage: { Bytes: sourceImageBytes }, // Bytes of the uploaded passport image
      TargetImage: { Bytes: targetImageBytes }, // Bytes of the reference image
      SimilarityThreshold: 90, // Set a similarity threshold
    };

    const response = await rekognition.compareFaces(params).promise();
    return response.FaceMatches && response.FaceMatches.length > 0;
  } catch (error) {
    console.error("Error with AWS Rekognition", error);
    return false;
  }
};