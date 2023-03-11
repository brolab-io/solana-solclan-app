import { Box, HStack, Image, Text, VStack, Button as NativeBaseButton } from 'native-base';
import React from 'react';
import Button from './Button';
import DepositActionSheet from './DepositActionSheet';

import plus_icon from '../assets/plus_icon.png';
import check_icon from '../assets/check_icon.png';
import dot_icon from '../assets/dot_icon.png';

type Props = {
  tabselected: number;
  isLoadingMember: boolean;
  hasJoined: boolean;
  onJoinOrDeposit: () => void;
  addNewProposal: () => void;
};
const ClanDetailTab = ({
  tabselected,
  isLoadingMember,
  hasJoined,
  onJoinOrDeposit,
  addNewProposal,
}: Props) => {
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
                  123 SOL
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
            disabled={isLoadingMember}
            isLoading={isLoadingMember}
            rounded="full"
            py="12px"
            mb="5"
            bg="#2F80ED"
            onPress={onJoinOrDeposit}>
            <Text color="white" fontSize="xl" fontWeight="bold">
              {isLoadingMember ? 'Checking...' : hasJoined ? 'Deposit' : 'Join Clan'}
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
      {tabselected === 3 ? (
        <VStack>
          <HStack borderBottomColor="#2D3748" borderBottomWidth="1" pb="5">
            <Button w="80%" onPress={addNewProposal} leftIcon={plus_icon}>
              <Text color="white" fontSize="md" fontWeight="bold">
                Add A New Proposals
              </Text>
            </Button>
          </HStack>
          <VStack borderBottomColor="#2D3748" borderBottomWidth="1" pt="2" pb="5" space="3">
            <Text color="white" fontSize="md">
              We should invite more people
            </Text>
            <HStack w="100%" justifyContent="space-between">
              <Button
                w="30%"
                py="1"
                backgroundColor="transparent"
                borderWidth="1"
                borderColor="#1AC486"
                rounded="14">
                <Text color="#1AC486" fontSize="md" fontWeight="bold">
                  Passed
                </Text>
              </Button>
              <Button w="20%" backgroundColor="#4A5568" rounded="14" py="1">
                <Text color="white" fontSize="md" fontWeight="bold">
                  058
                </Text>
              </Button>
              <Box w="1%" my="1" borderLeftColor="#4A5568" borderLeftWidth="1" />

              <Button
                w="30%"
                space="4"
                backgroundColor="transparent"
                rounded="14"
                leftIcon={check_icon}
                py="1">
                <Text color="#1AC486" fontSize="md" fontWeight="bold">
                  Executed
                </Text>
              </Button>
            </HStack>
            <Text color="#718096" fontSize="md" fontWeight="bold">
              12:30 A.M 8/3/2023
            </Text>
          </VStack>

          <VStack borderBottomColor="#2D3748" borderBottomWidth="1" pt="2" pb="5" space="3">
            <Text color="white" fontSize="md">
              Invest on Solend private round
            </Text>
            <HStack w="100%" justifyContent="space-between">
              <Button
                w="30%"
                py="1"
                backgroundColor="transparent"
                borderWidth="1"
                borderColor="#805AD5"
                rounded="14">
                <Text color="#805AD5" fontSize="md" fontWeight="bold">
                  Running
                </Text>
              </Button>
              <Button w="20%" backgroundColor="#4A5568" rounded="14" py="1">
                <Text color="white" fontSize="md" fontWeight="bold">
                  058
                </Text>
              </Button>
              <Box w="1%" my="1" borderLeftColor="#4A5568" borderLeftWidth="1" />

              <Button
                w="30%"
                space="4"
                backgroundColor="transparent"
                rounded="14"
                leftIcon={dot_icon}
                py="1">
                <Text color="#805AD5" fontSize="md" fontWeight="bold">
                  Queue
                </Text>
              </Button>
            </HStack>
            <Text color="#718096" fontSize="md" fontWeight="bold">
              12:30 A.M 9/9/2021
            </Text>
          </VStack>
        </VStack>
      ) : null}
      <DepositActionSheet />
    </VStack>
  );
};

export default ClanDetailTab;
