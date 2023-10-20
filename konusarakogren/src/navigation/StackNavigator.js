import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import routes from './routes';

console.log(routes)

// Screen  Components
import Quiz from '../ui/screens/Quiz/Quiz';

// Navigators
// import Hamza from '../ui/screens/Quiz/Test';
import { AppDrawerStack } from './AppNavigator';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={routes["QUIZ"]}
      screenOptions={{ headerShown: true, animationEnabled: false }}>
      <Stack.Screen name={routes["QUIZ"]} component={Quiz} />
      {/* <Stack.Screen name={routes["HAMZA"]} component={Hamza} /> */}
      <Stack.Screen name={'DrawerStack'} component={AppDrawerStack} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
