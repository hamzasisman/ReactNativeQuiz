import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  NavIcon,
  NavIcon1,
  NavIcon2,
  NavIcon3,
  NavIcon4,
  NavIcon5
} from '../assets/svgs';
import { colors } from '../theme/Colors';
import { units } from '../theme/Units';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import CustomDrawer from './CustomDrawer';
// import { useLocalization } from '../hooks/useLocalization';
import QuizFeedNavigator from './QuizFeedNavigator';
import routes from './routes';
// import Quiz from '../ui/screens/Quiz/Quiz';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export const AppDrawerStack = ({ navigation }) => {
  const strings = useLocalization();

  return (
    <Drawer.Navigator
      initialRouteName={routes.APP_NAVIGATOR}
      useLegacyImplementation={true}
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={() => ({
        headerShown: false,
        drawerPosition: 'right'
      })}>
      <Drawer.Screen name={routes.APP_NAVIGATOR} component={AppNavigator} />
      <Drawer.Screen
        name={strings.support_drawer}
        component={QuizFeedNavigator}
        initialParams={{ icon: 1 }}
      />
      <Drawer.Screen
        name={routes.QUIZ}
        component={Quiz}
        initialParams={{ icon: 2 }}
      />
      <Drawer.Screen
        name={routes.QUIZ}
        component={Quiz}
        initialParams={{ icon: 2 }}
      />
    </Drawer.Navigator>
  );
};
// screen kısmında icon :1 verdim daha sonra eklenecek menüler için iconları farklı farklı alabilmek için işlemin devamı custom drawer içerisinde

const AppNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarButton:
          route.name == 'Quiz'
            ? () => {
                return null;
              }
            : undefined,
        tabBarStyle: { height: units.height / 14 + insets.bottom },
        tabBarIcon: ({ focused }) => {
          let icon;
          if (route.name === 'Quiz') {
            icon = focused ? (
              <NavIcon
                fill={colors.BLACK}
                width={units.height / 9.5}
                height={units.height / 9.5}
              />
            ) : (
              <NavIcon
                fill={colors.TAB_GREY}
                width={units.height / 9.5}
                height={units.height / 9.5}
              />
            );
          } else if (route.name === 'Quiz') {
            icon = focused ? (
              <NavIcon1
                fill={colors.BLACK}
                width={units.height / 9.5}
                height={units.height / 9.5}
              />
            ) : (
              <NavIcon1
                fill={colors.TAB_GREY}
                width={units.height / 9.5}
                height={units.height / 9.5}
              />
            );
          } else if (route.name === 'Quiz') {
            icon = focused ? (
              <NavIcon2
                fill={colors.BLACK}
                width={units.height / 9.5}
                height={units.height / 9.5}
              />
            ) : (
              <NavIcon2
                fill={colors.TAB_GREY}
                width={units.height / 9.5}
                height={units.height / 9.5}
              />
            );
          } else if (route.name === 'Quiz') {
            icon = focused ? (
              <NavIcon3
                fill={colors.BLACK}
                width={units.height / 9.5}
                height={units.height / 9.5}
              />
            ) : (
              <NavIcon3
                fill={colors.TAB_GREY}
                width={units.height / 9.5}
                height={units.height / 9.5}
              />
            );
          } else if (route.name === 'Quiz') {
            icon = focused ? (
              <NavIcon4
                fill={colors.BLACK}
                width={units.height / 9.5}
                height={units.height / 9.5}
              />
            ) : (
              <NavIcon4
                fill={colors.TAB_GREY}
                width={units.height / 9.5}
                height={units.height / 9.5}
              />
            );
          } else if (route.name === 'Quiz') {
            icon = focused ? (
              <NavIcon5
                fill={colors.BLACK}
                width={units.height / 9.5}
                height={units.height / 9.5}
              />
            ) : (
              <NavIcon5
                fill={colors.TAB_GREY}
                width={units.height / 9.5}
                height={units.height / 9.5}
              />
            );
          }

          return icon;
        },
        headerShown: false,
        tabBarShowLabel: false
      })}>
      <Tab.Screen name={'Quiz'} component={QuizFeedNavigator} />
      <Tab.Screen name={'Quiz'} component={QuizFeedNavigator} />
      <Tab.Screen name={'Quiz'} component={QuizFeedNavigator} />
      <Tab.Screen name={'Quiz'} component={QuizFeedNavigator} />
      <Tab.Screen name={'Quiz'} component={QuizFeedNavigator} />
      <Tab.Screen name={'Quiz'} component={QuizFeedNavigator} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
