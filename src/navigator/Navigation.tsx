import React from 'react';
import {
  EventMapBase,
  NavigationState,
  RouteConfig,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
  TransitionPresets,
} from '@react-navigation/stack';
import {Routers} from '../constants/Routers';
import IntroScreen from '../app/onboarding/Onboarding';
import MainTabScreen from './TabNavigation';

const AppStack = createStackNavigator<MyParamList>();

type MyParamList = {
  [Routers.IntroScreen]: undefined;
  [Routers.MainTabScreen]: undefined;
};

export const useMyRoute = <T extends keyof MyParamList>() => {
  return useRoute<RouteProp<MyParamList, T>>();
};

export const useMyNavigation = () => {
  return useNavigation<StackNavigationProp<MyParamList>>();
};

type MyRouteConfig = RouteConfig<
  MyParamList,
  keyof MyParamList,
  NavigationState,
  {},
  EventMapBase
> & {
  component: React.ComponentType<any>;
};

const defaultStackOptions: StackNavigationOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
};

const AppRouters: MyRouteConfig[] = [
  {
    name: Routers.MainTabScreen,
    component: MainTabScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: Routers.IntroScreen,
    component: IntroScreen,
    options: {
      headerShown: false,
    },
  },
];

const AppNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={defaultStackOptions}>
      {AppRouters.map((route, index) => (
        <AppStack.Screen
          key={index}
          name={route.name}
          options={route.options}
          component={route.component}
        />
      ))}
    </AppStack.Navigator>
  );
};

export {AppNavigator};
