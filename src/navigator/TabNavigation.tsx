import { Routers } from '@/constants/Routers';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React, { ComponentProps } from 'react';
import MyTabBar from './MyTabar';
import HomeScreen from '@/app/home/Home';
import OnboardingScreen from '@/app/onboarding/Onboarding';
import CreateClanScreen from '@/app/create-clan/CreateClan';

const MainTabStack = createBottomTabNavigator();
const tabarOption: BottomTabNavigationOptions = {
  headerShown: false,
};

const tabBar: ComponentProps<(typeof MainTabStack)['Navigator']>['tabBar'] = props => (
  <MyTabBar {...props} />
);

const MainTabScreen: React.FC = () => {
  return (
    <MainTabStack.Navigator screenOptions={tabarOption} tabBar={tabBar}>
      <MainTabStack.Screen name={Routers.OnboardingScreen} component={HomeScreen} />
      <MainTabStack.Screen name={'sdfasd'} component={OnboardingScreen} />
      <MainTabStack.Screen name={Routers.CreateClanScreen} component={CreateClanScreen} />
      <MainTabStack.Screen name={'sdfasdsdfsdf'} component={OnboardingScreen} />
      <MainTabStack.Screen name={'sdfasdsdfdsdfsdf'} component={OnboardingScreen} />
    </MainTabStack.Navigator>
  );
};
export default MainTabScreen;
