import React, { useState } from 'react';
import { NativeModules, Platform, Settings, Vibration } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import navigationTheme from './navigationTheme';

import linking from '../utils/linking';


export default function RootNavigator() {


    return (
        <NavigationContainer theme={navigationTheme} linking={linking}>
            <StackNavigator />
        </NavigationContainer>
    );
}
