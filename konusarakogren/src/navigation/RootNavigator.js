import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
// import linking from '../utils/linking';
// import navigationTheme from './navigationTheme';
import { createStackNavigator } from '@react-navigation/stack';

import StackNavigator from './StackNavigator';
const Stack = createStackNavigator();

export default function RootNavigator() {

    console.log("\n\n\n\n\n\n\n\nroot\n\n\n\n\n\n\n\n\n\n\n\n");
    return (
        <NavigationContainer>
            <StackNavigator />
        </NavigationContainer>
    );
}
