import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import linking from '../utils/linking';
import navigationTheme from './navigationTheme';
import StackNavigator from './StackNavigator';

export default function RootNavigator() {

  return (
    <NavigationContainer >
        <StackNavigator theme={navigationTheme} linking={linking} />
    </NavigationContainer>
  );
}