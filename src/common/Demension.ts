import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
export const widthDimensions = (dimensions: number, minus_px: number = 0) => {
  let itemCounter = (screenWidth - minus_px) / dimensions;
  return Math.floor((screenWidth - minus_px) / Math.floor(itemCounter));
};
