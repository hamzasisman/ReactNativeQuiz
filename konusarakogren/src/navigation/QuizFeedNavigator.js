import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';
import Quiz from '../ui/screens/Quiz/Quiz';

const Stack = createStackNavigator();

const QuizFeedNavigator = ({ navigation, route }) => {
    console.log(route)
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, animationEnabled: false }}>
            <Stack.Screen name={routes.QUIZ} component={Quiz} />
        </Stack.Navigator>
    );
};

export default QuizFeedNavigator;
