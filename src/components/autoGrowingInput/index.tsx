import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface AutoGrowingInputType {
  placeholder: string;
  onChangeText: Function;
  value: string;
  style?: object;
}

const AutoGrowingInput: React.FC<AutoGrowingInputType> = ({
  onChangeText,
  placeholder,
  value,
  style,
}) => {
  const [height, setHeight] = React.useState(30);

  return (
    <TextInput
      multiline
      style={[styles.container, style, { height }]}
      onContentSizeChange={event => {
        setHeight(event.nativeEvent.contentSize.height);
      }}
      placeholder={placeholder}
      onChangeText={text => onChangeText(text)}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.grey,
    borderWidth: 1,
  },
});

export default AutoGrowingInput;
