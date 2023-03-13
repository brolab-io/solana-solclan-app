import React, { PropsWithChildren, useCallback } from 'react';
import { ACTION_SHEET } from '@/constants/ActionSheet';
import { Button, HStack, Text, VStack } from 'native-base';
import ActionSheet from 'react-native-actions-sheet';
import { StyleSheet } from 'react-native';
import MyInput from './Input';
import useDepositMutation from '@/hooks/mutations/useDepositMutation';
import { BN } from '@project-serum/anchor';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { queryClient } from '@/configs/query.client';
import { doNothing } from '@/lib/solana/utils';

type Props = {
  id: BN;
};

const DepositActionSheet: React.FC<PropsWithChildren<Props>> = ({ id }) => {
  const [value, setValue] = React.useState<string>('');

  const { mutateAsync: deposit, isLoading: isDepositing } = useDepositMutation();

  const onValueChange = useCallback((text: string | Date) => {
    setValue(text.toString());
  }, []);

  const handleDeposit = useCallback(async () => {
    console.log('Handle deposit', value, 'to', id);
    const amount = new BN(parseFloat(value)).mul(new BN(LAMPORTS_PER_SOL));
    console.log(`Deposit ${value} (${amount}) to clan ${id}`);
    try {
      await deposit({
        id,
        amount,
      });
      queryClient.invalidateQueries(['clan', id.toString()]);
    } catch (error) {
      console.log(error);
    }
  }, [deposit, id, value]);

  return (
    <ActionSheet
      id={ACTION_SHEET.DEPOSIT}
      overdrawEnabled={true}
      headerAlwaysVisible={true}
      containerStyle={styles.container}
      animated
      gestureEnabled={true}>
      <VStack p="5" space="5">
        <MyInput
          value={value}
          onChange={onValueChange}
          title=" Enter deposit amount"
          placeholder="Type deposit amount here"
          rightText="SOL"
          keyboardType="numeric"
        />

        <HStack space="5" alignItems="center">
          <Button
            w="25%"
            ml="auto"
            onPress={doNothing}
            isLoading={isDepositing}
            isLoadingText="Depositing"
            rounded="full"
            backgroundColor="transparent"
            borderColor="#4C5172"
            borderWidth="1">
            <Text color="white" fontSize="md" fontWeight="bold">
              Cancel
            </Text>
          </Button>
          <Button
            isLoading={isDepositing}
            isLoadingText="Depositing"
            w="35%"
            onPress={handleDeposit}
            rounded="full"
            backgroundColor="#215BF0">
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
