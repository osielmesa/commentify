import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../screens/Home';
import { screenNames } from '../../commons/screenNames';
import CommentsScreen from '../../screens/Comments';

const Stack = createNativeStackNavigator();

const AppNavigation: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={screenNames.home} component={HomeScreen} />
      <Stack.Screen name={screenNames.comments} component={CommentsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
