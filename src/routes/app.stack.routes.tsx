import React from 'react';
import { Platform } from 'react-native';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { Search } from '../screens/Search';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
};

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function AppStackRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={Home} />

      <Screen
        name="Search"
        component={Search}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator:
            Platform.OS === 'ios'
              ? CardStyleInterpolators.forModalPresentationIOS
              : CardStyleInterpolators.forRevealFromBottomAndroid,
        }}
      />
    </Navigator>
  );
}
