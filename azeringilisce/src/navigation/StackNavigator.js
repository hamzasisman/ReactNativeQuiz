import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';

// Screen  Components
// import Quiz from '../ui/screens/Quiz/Quiz';

// Navigators
import { AppDrawerStack } from './AppNavigator';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName={routes.QUIZ}
      screenOptions={{ headerShown: false, animationEnabled: false }}>
      {/* <Stack.Screen name={routes.QUIZ} component={Quiz} /> */}
      {/* <Stack.Screen name={routes.VIDEO_SCREEN} component={VideoPlayer} /> */}
      <Stack.Screen name={'DrawerStack'} component={AppDrawerStack} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
