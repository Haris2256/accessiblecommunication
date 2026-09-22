import { ImageSourcePropType } from 'react-native';

export interface CommButton {
  id: string;
  label: string;
  speechText: string;
  imageUri: ImageSourcePropType;
}