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
import { Routers } from '../constants/Routers';
import OnboardingScreen from '../app/onboarding/Onboarding';
import MainTabScreen from './TabNavigation';
import ClanDetailScreen from '@/app/home/ClanDetail';
import usePublicKey from '@/lib/solana/hooks/usePublicKey';
import CreateClanScreen from '@/app/create-clan/CreateClan';
import { ClanData } from '@/configs/programs';
import ClanHistoryScreen from '@/app/clan-history/History';

const AppStack = createStackNavigator<MyParamList>();

type MyParamList = {
  [Routers.OnboardingScreen]: undefined;
  [Routers.MainTabScreen]: undefined;
  [Routers.CreateClanScreen]: undefined;
  [Routers.ClanDetailScreen]: { item: ClanData };
  [Routers.ProfileScreen]: undefined;
  [Routers.ClanHistoryScreen]: undefined;
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
    name: Routers.OnboardingScreen,
    component: OnboardingScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: Routers.MainTabScreen,
    component: MainTabScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: Routers.ClanDetailScreen,
    component: ClanDetailScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: Routers.CreateClanScreen,
    component: CreateClanScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: Routers.ClanHistoryScreen,
    component: ClanHistoryScreen,
    options: {
      headerShown: false,
    },
  },
];

const AppNavigator = () => {
  const publicKey = usePublicKey();
  const initialRouteName = publicKey ? Routers.MainTabScreen : Routers.OnboardingScreen;
  return (
    <AppStack.Navigator screenOptions={defaultStackOptions} initialRouteName={initialRouteName}>
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

export { AppNavigator };
