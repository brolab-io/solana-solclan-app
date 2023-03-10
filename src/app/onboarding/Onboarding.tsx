import Button from '@/components/Button';
import { Routers } from '@/constants/Routers';
import useConnect from '@/lib/solana/hooks/useConnect';
import { useMyNavigation } from '@/navigator/Navigation';
import { BlurView } from '@react-native-community/blur';
import { Box, Image, Text, VStack } from 'native-base';
import React, { PropsWithChildren, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import background from '../../assets/background.png';
import solIcon from '../../assets/sol_icon.png';
import phantomIcon from '../../assets/icons/phantom_24x24.png';

const OnboardingScreen: React.FC<PropsWithChildren> = () => {
  const { navigate } = useMyNavigation();
  const { connect, isConnected, publicKey } = useConnect();
  const handlePressExplore = useCallback(() => {
    navigate(Routers.MainTabScreen);
  }, [navigate]);

  const handlePressConnect = useCallback(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    if (isConnected && publicKey) {
      console.log(`Solana connected: ${publicKey.toBase58()}`);
      navigate(Routers.MainTabScreen);
    }
  }, [isConnected, navigate, publicKey]);

  return (
    <Box h="100%" position="relative" backgroundColor="black">
      <Image width="100%" height="80%" source={background} alt="solclan" resizeMode="cover" />
      <Box position="absolute" bottom="0" width="100%" height="40%">
        <VStack
          position="relative"
          w="100%"
          h="100%"
          alignItems="center"
          justifyContent="space-around"
          px="10">
          <BlurView
            style={styles.absolute}
            blurType="dark"
            blurAmount={100}
            overlayColor="rgba(0, 0, 0, 0)"
            reducedTransparencyFallbackColor="pink"
          />
        </VStack>
        <VStack
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          right="0"
          alignItems="center"
          justifyContent="space-around"
          zIndex={999}
          px="10">
          <Button
            top={-25}
            left={10}
            width="auto"
            px="5"
            backgroundColor="gray.700"
            position="absolute"
            leftIcon={solIcon}>
            <Text color="white" fontSize="xl">
              SOLSCLAN
            </Text>
          </Button>
          <Text color="white" fontSize="3xl" fontWeight="bold" mt="5">
            Invest with a community, not just a platform
          </Text>
          <VStack mb="6" width="full" space="4">
            <Button onPress={handlePressExplore}>
              <Text color="white" fontSize="xl">
                Let's Explore! 🔥
              </Text>
            </Button>
            <Button backgroundColor="#543bd6" leftIcon={phantomIcon} onPress={handlePressConnect}>
              <Text color="white" fontSize="xl" ml="2">
                Connect Wallet
              </Text>
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Box>
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

export default OnboardingScreen;
