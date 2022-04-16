import React from 'react';
import { View, ScrollView, Text } from 'react-native';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        <Text>Home screen</Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
