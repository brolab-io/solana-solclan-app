import { Box, HStack, Text, VStack } from 'native-base';
import React from 'react';
import Button from './Button';

type Props = {
  isVoteFor?: boolean;
  isHash?: boolean;
};

const Vote: React.FC<Props> = ({ isVoteFor = true, isHash = true }) => {
  return (
    <VStack backgroundColor="#1A202C" rounded="2xl" p="5" space="5" mt="5">
      <HStack justifyContent="space-between">
        <Text color="white" fontSize="lg">
          {isVoteFor ? 'Vote For' : 'Vote Against'}
        </Text>
        <Text color="white" fontSize="lg">
          905,764
        </Text>
      </HStack>
      <Box w="100%" h="10px" backgroundColor="#4A5568" rounded="full">
        <Box w="50%" h="10px" backgroundColor={isVoteFor ? '#215BF0' : '#F56565'} rounded="full" />
      </Box>
      <VStack>
        <HStack
          justifyContent="space-between"
          borderBottomColor="#2D3748"
          borderBottomWidth="1"
          flex={1}
          py="3">
          <Text flex={1} color="#718096" fontSize="lg">
            Address
          </Text>
          {isHash ? (
            <Text flex={1} color="#718096" fontSize="lg" textAlign="center">
              Hash
            </Text>
          ) : null}

          <Text flex={1} color="#718096" fontSize="lg" textAlign="right">
            Vote
          </Text>
        </HStack>
        {Array.from(Array(4)).map((_, index) => (
          <HStack
            key={index}
            justifyContent="space-between"
            borderBottomColor="#2D3748"
            borderBottomWidth="1"
            flex={1}
            py="3">
            <Text flex={1} color="#FFFFFF" fontSize="lg">
              Gauntlet
            </Text>
            {isHash ? (
              <Text flex={2} color="#4299E1" fontSize="lg" textAlign="center">
                0fx2....qg8b
              </Text>
            ) : null}
            <Text flex={1} color="#FFFFFF" fontSize="lg" textAlign="right">
              105,478
            </Text>
          </HStack>
        ))}
      </VStack>
      <Button backgroundColor="#2D3748" rounded="2xl">
        <Text color="white" fontSize="md" fontWeight="bold">
          View All
        </Text>
      </Button>
    </VStack>
  );
};

export default Vote;
