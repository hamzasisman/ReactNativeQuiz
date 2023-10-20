import React, { useState } from 'react';
import { NativeModules, Platform, Settings, Vibration } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import navigationTheme from './navigationTheme';


export default function RootNavigator() {


    return (
        <NavigationContainer theme={navigationTheme}>
            <StackNavigator />
        </NavigationContainer>
    );
}
