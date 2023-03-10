import React, { PropsWithChildren } from 'react';
import { ACTION_SHEET } from '@/constants/ActionSheet';
import { Button, HStack, Input, Text, VStack } from 'native-base';
import ActionSheet from 'react-native-actions-sheet';
import { StyleSheet } from 'react-native';

const DepositActionSheet: React.FC<PropsWithChildren> = () => {
  return (
    <ActionSheet
      id={ACTION_SHEET.DEPOSIT}
      overdrawEnabled={true}
      headerAlwaysVisible={true}
      containerStyle={styles.container}
      animated
      gestureEnabled={true}>
      <VStack p="5" space="5">
        <Text color="white" fontSize="xl">
          Enter deposit amount
        </Text>

        <HStack
          w="100%"
          alignItems="center"
          space="2"
          backgroundColor="#2D3748"
          borderRadius="full">
          <Input
            keyboardType="numeric"
            w="85%"
            borderWidth={0}
            color="white"
            fontSize="md"
            backgroundColor="transparent"
            placeholder="Type deposit amount here"
          />
          <Text color="white" fontSize="md" ml="auto" mr="5">
            SOL
          </Text>
        </HStack>

        <HStack space="5" alignItems="center">
          <Button
            w="25%"
            ml="auto"
            onPress={() => null}
            rounded="full"
            backgroundColor="transparent"
            borderColor="#4C5172"
            borderWidth="1">
            <Text color="white" fontSize="md" fontWeight="bold">
              Cancel
            </Text>
          </Button>
          <Button w="35%" onPress={() => null} rounded="full" backgroundColor="#215BF0">
            <Text color="white" fontSize="md" fontWeight="bold">
              Deposit
            </Text>
          </Button>
        </HStack>
      </VStack>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(26, 32, 44, 0.9)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingBottom: 40,
  },
});
export default DepositActionSheet;
