// Component to display text, useful if app global text changes want to be introduced (like custom fonts)
import React from 'react';
import { Text } from 'react-native';

interface CustomTextProps {
  text: string;
  style?: object;
}

const CustomText: React.FC<CustomTextProps> = ({ text, style }) => {
  return <Text style={style}>{text}</Text>;
};

export default CustomText;
