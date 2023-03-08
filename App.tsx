/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, StatusBar, SafeAreaView} from 'react-native';
import {QueryClientProvider} from '@tanstack/react-query';
import {NativeBaseProvider} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {queryClient} from './config/query.client';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './src/navigator/Navigation';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={styles.AndroidSafeArea}>
          <StatusBar
            translucent={true}
            backgroundColor={'transparent'}
            barStyle={'light-content'}
          />
          <AppNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

function RootApp(): JSX.Element {
  const config = {
    dependencies: {
      'linear-gradient': require('react-native-linear-gradient').default,
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider config={config}>
        <App />
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {},
  AndroidSafeArea: {
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
  },
});

export default RootApp;
