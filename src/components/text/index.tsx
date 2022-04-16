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
