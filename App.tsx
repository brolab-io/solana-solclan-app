/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigator/Navigation';
import { SolanaProvider } from '@/lib/solana';
import { queryClient } from '@/configs/query.client';

const App: React.FC = () => {
  return (
    <SolanaProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <StatusBar
            translucent={true}
            backgroundColor={'transparent'}
            barStyle={'light-content'}
          />
          <AppNavigator />
        </SafeAreaProvider>
      </NavigationContainer>
    </SolanaProvider>
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

export default RootApp;
