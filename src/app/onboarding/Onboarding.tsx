import Button from '@/components/Button';
import {Routers} from '@/constants/Routers';
import {useMyNavigation} from '@/navigator/Navigation';
import {BlurView} from '@react-native-community/blur';
import {Box, Image, Text, VStack} from 'native-base';
import React, {PropsWithChildren, useCallback} from 'react';
import {StyleSheet} from 'react-native';
const background = require('../../../assets/background.png');
const solIcon = require('../../../assets/sol_icon.png');

const IntroScreen: React.FC<PropsWithChildren> = () => {
  const {navigate} = useMyNavigation();
  const letsPress = useCallback(() => {
    console.log('letsPress');
    navigate(Routers.MainTabScreen);
  }, [navigate]);

  return (
    <Box h="100%" position="relative" backgroundColor="black">
      <Image source={background} alt="solclan" />
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
          <Button mb="5" onPress={letsPress}>
            <Text color="white" fontSize="xl">
              Let’s Explore! 🔥
            </Text>
          </Button>
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

export default IntroScreen;
