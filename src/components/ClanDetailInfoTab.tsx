import { HStack, Image, Text, VStack } from 'native-base';
import React from 'react';
import Button from './Button';

const ClanDetailInfoTab = () => {
  return (
    <VStack space="5">
      <VStack p="3" space="2" justifyContent="flex-start">
        <Text color="#9498AA" fontSize="md">
          Treasury Balance
        </Text>
        <HStack alignItems="center" space="2" justifyContent="flex-start">
          <Image
            source={require('../assets/sol_balance.png')}
            alt="sol_balance"
            w={6}
            h={6}
            borderRadius="full"
          />
          <Text color="white" fontSize="md">
            123 SOL
          </Text>
        </HStack>
      </VStack>
      <Button mb="5" onPress={() => null}>
        <Text color="white" fontSize="xl" fontWeight="bold">
          Join Clan
        </Text>
      </Button>
    </VStack>
  );
};

export default ClanDetailInfoTab;
