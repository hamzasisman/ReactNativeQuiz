import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';

// Screen  Components
import Quiz from '../ui/screens/Quiz/Quiz';

// Navigators
import { AppDrawerStack } from './AppNavigator';

const Stack = createStackNavigator();
console.log("stack");
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Quiz">
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name={'DrawerStack'} component={AppDrawerStack} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
