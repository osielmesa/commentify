import React from 'react';
import { Text } from 'react-native';

interface CustomTextProps {
  text: string;
}

const CustomText: React.FC<CustomTextProps> = ({ text }) => {
  return <Text>{text}</Text>;
};

export default CustomText;
