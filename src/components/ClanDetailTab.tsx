import { HStack, Image, Text, VStack, Button as NativeBaseButton } from 'native-base';
import React from 'react';
import DepositActionSheet from './DepositActionSheet';

import { ClanData } from '@/configs/programs';
import { formatSOL } from '@/lib/solana/utils';
import TabProposalList from './ClanDetail/TabProposalList';

type Props = {
  tabselected: number;
  isLoading: boolean;
  hasJoined: boolean;
  item: ClanData;
  onJoinOrDeposit: () => void;
};
const ClanDetailTab = ({ tabselected, isLoading, hasJoined, item, onJoinOrDeposit }: Props) => {
  return (
    <VStack>
      {tabselected === 0 ? (
        <VStack space="5">
          <HStack>
            <VStack space="2" justifyContent="flex-start">
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
                  {formatSOL(item.power)} SOL
                </Text>
              </HStack>
            </VStack>
            {false ? (
              <VStack space="2" ml="auto">
                <Text color="#9498AA" fontSize="md">
                  My Voting Power
                </Text>
                <HStack alignItems="center" space="2" justifyContent="flex-end">
                  <Text color="white" fontSize="md">
                    0
                  </Text>
                </HStack>
              </VStack>
            ) : null}
          </HStack>
          <NativeBaseButton
            disabled={isLoading}
            isLoading={isLoading}
            rounded="full"
            height="56px"
            mb="5"
            bg="#2F80ED"
            onPress={onJoinOrDeposit}>
            <Text color="white" fontSize="xl" fontWeight="bold">
              {isLoading ? 'Checking...' : hasJoined ? 'Deposit' : 'Join Clan'}
            </Text>
          </NativeBaseButton>
        </VStack>
      ) : null}
      {tabselected === 1 ? (
        <VStack>
          <HStack justifyContent="space-between">
            <VStack>
              <Text color="#9498AA" fontSize="md">
                Name
              </Text>
              <HStack alignItems="flex-end" space="1">
                <Image
                  source={require('../assets/sol_balance.png')}
                  alt="sol_balance"
                  w={8}
                  h={8}
                  borderRadius="full"
                />
                <Text color="white" fontSize="xs">
                  @henry
                </Text>
              </HStack>
            </VStack>

            <VStack justifyContent="space-between">
              <Text color="#9498AA" fontSize="md">
                Day Joined
              </Text>
              <HStack alignItems="center" justifyContent="flex-end">
                <Text color="white" fontSize="xs">
                  March 8, 2023 at 10:18 pm
                </Text>
              </HStack>
            </VStack>

            <VStack justifyContent="space-between">
              <Text color="#9498AA" fontSize="md">
                Vote Power
              </Text>
              <HStack justifyContent="flex-end">
                <Text color="white" fontSize="xs">
                  22
                </Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      ) : null}
      {tabselected === 2 ? (
        <HStack alignItems="center" space="3">
          <Image
            source={require('../assets/sol_balance.png')}
            alt="sol_balance"
            w={10}
            h={10}
            borderRadius="full"
          />
          <VStack>
            <Text color="white" fontSize="md">
              Proposal created by
              <Text color="#9498AA" fontSize="md">
                {' '}
                @henry
              </Text>
            </Text>
            <Text color="#9498AA" fontSize="md">
              March 8, 2023 at 10:18 pm
            </Text>
          </VStack>
        </HStack>
      ) : null}
      {tabselected === 3 ? <TabProposalList item={item} /> : null}
      <DepositActionSheet id={item.id} />
    </VStack>
  );
};

export default ClanDetailTab;
