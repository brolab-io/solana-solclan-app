import {Routers} from '@/constants/Routers';
import {BottomTabNavigationOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import MyTabBar from './MyTabar';
import HomeScreen from '@/app/home/Home';
import IntroScreen from '@/app/onboarding/Onboarding';

const MainTabStack = createBottomTabNavigator();
const tabarOption: BottomTabNavigationOptions = {
  headerShown: false,
};

const MainTabScreen: React.FC = () => {
  return (
    <MainTabStack.Navigator screenOptions={tabarOption} tabBar={props => <MyTabBar {...props} />}>
      <MainTabStack.Screen name={Routers.IntroScreen} component={HomeScreen} />
      <MainTabStack.Screen name={'sdfasd'} component={IntroScreen} />
      <MainTabStack.Screen name={'sdfasddfds'} component={IntroScreen} />
      <MainTabStack.Screen name={'sdfasdsdfsdf'} component={IntroScreen} />
      <MainTabStack.Screen name={'sdfasdsdfdsdfsdf'} component={IntroScreen} />
    </MainTabStack.Navigator>
  );
};
export default MainTabScreen;
