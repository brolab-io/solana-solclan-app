import {BottomTabBarProps, BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import {Box} from 'native-base';
import React, {memo, useCallback} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const tabOptions = [
  {
    label: '',
    icon: 'ios-home-outline',
  },
  {
    label: '',
    icon: 'ios-search',
  },
  {
    label: '',
    icon: 'md-add-circle',
  },
  {
    label: '',
    icon: 'md-pulse',
  },
  {
    label: '',
    icon: 'md-person',
  },
];

type TabItemProps = {
  navigation: BottomTabBarProps['navigation'];
  state: BottomTabBarProps['state'];
  route: BottomTabBarProps['state']['routes'][0];
  options: BottomTabNavigationOptions;
  index: number;
};

const TabItem: React.FC<TabItemProps> = memo(
  ({navigation, state, route, index, options}: TabItemProps) => {
    const {icon} = tabOptions[index];

    const isFocused = state.index === index;
    const color = isFocused ? 'white' : 'grey';

    const onPress = useCallback(() => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        // The `merge: true` option makes sure that the params inside the tab screen are preserved
        navigation.dispatch(CommonActions.navigate({name: route.name, merge: true}));
      }
    }, [isFocused, navigation, route.key, route.name]);

    const onLongPress = useCallback(() => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    }, [navigation, route.key]);

    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.itemContainer}>
        {index === 2 ? (
          <Icon color={'#215BF0'} name={isFocused ? icon : icon} size={60} />
        ) : (
          <Icon color={color} name={isFocused ? icon : `${icon}-outline`} size={25} />
        )}
      </Pressable>
    );
  },
);

const MyTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  return (
    <Box
      style={styles.tabContainer}
      bg={{
        linearGradient: {
          //   colors: ['rgba(30, 30, 30,1)', 'rgba(30, 30, 30,1)'],
          colors: ['#232324bb', '#121211'],
          start: [0, 0],
          end: [1, 0],
        },
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        return (
          <TabItem
            key={route.key}
            options={options}
            state={state}
            navigation={navigation}
            index={index}
            route={route}
          />
        );
      })}
    </Box>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    height: 80,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#167ac60A',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default MyTabBar;
