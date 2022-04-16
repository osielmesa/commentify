import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../../theme';
import { Icon } from '@rneui/themed';
import CustomText from '../../text';

interface IconButtonType {
  iconName: string;
  title: string;
  onPress?: Function;
  containerStyle?: object;
  textStyle?: object;
}

const IconButton: React.FC<IconButtonType> = props => {
  const { iconName, title, onPress, containerStyle, textStyle } = props;

  const onPressHandler = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPressHandler}>
      <Icon
        name={iconName}
        color={theme.colors.grey}
        type="material-community"
        size={18}
        style={styles.icon}
      />
      <CustomText text={title} style={textStyle} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 3,
  },
});

export default IconButton;
