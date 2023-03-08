import {Routers} from '@/constants/Routers';
import {BlurView} from '@react-native-community/blur';
import {BottomTabNavigationOptions, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import MyTabBar from './MyTabar';
import HomeScreen from '@/app/home/Home';
import IntroScreen from '@/app/onboarding/Onboarding';

const MainTabStack = createBottomTabNavigator();
const tabarOption: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: '#215BF0',
  tabBarInactiveTintColor: '#D60053',
  tabBarStyle: {
    backgroundColor: 'transparent',
  },
  tabBarBackground: () => (
    <BlurView
      style={styles.absolute}
      blurType="dark"
      blurAmount={100}
      overlayColor="rgba(0, 0, 0, 0)"
      reducedTransparencyFallbackColor="pink"
    />
  ),
};

const MainTabScreen: React.FC = () => {
  return (
    <MainTabStack.Navigator
      screenOptions={tabarOption}
      tabBar={props => <MyTabBar {...props} />}
      sceneContainerStyle={{backgroundColor: 'transparent'}}>
      <MainTabStack.Screen name={Routers.IntroScreen} component={HomeScreen} />
      <MainTabStack.Screen name={'sdfasd'} component={IntroScreen} />
      <MainTabStack.Screen name={'sdfasddfds'} component={IntroScreen} />
      <MainTabStack.Screen name={'sdfasdsdfsdf'} component={IntroScreen} />
      <MainTabStack.Screen name={'sdfasdsdfdsdfsdf'} component={IntroScreen} />
    </MainTabStack.Navigator>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default MainTabScreen;
