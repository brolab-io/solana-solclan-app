import { Box, HStack, Image, Text, VStack } from 'native-base';
import React, { PropsWithChildren } from 'react';

type Props = {
  data: any;
};
const UserInfo: React.FC<PropsWithChildren<Props>> = ({ data }) => {
  return (
    <VStack px="5" mt="10" space="5">
      <HStack space="5" alignItems="center">
        <Image src={data.avatar} alt="avatar" w="32" h="32" rounded="full" />
        <VStack>
          <Text color="white" fontSize="2xl">
            {data.name}
          </Text>
          <Text color="white" fontSize="md">
            {data.nick_name}
          </Text>
        </VStack>
      </HStack>

      <HStack justifyContent="space-between">
        <VStack justifyContent="center" alignItems="center" w="25%">
          <Text color="white" fontSize="xl">
            {data.clan_number}
          </Text>
          <Text color="white" fontSize="md">
            Clan
          </Text>
        </VStack>
        <VStack
          justifyContent="center"
          alignItems="center"
          borderLeftWidth="1"
          borderRightWidth="1"
          w="50%"
          borderColor="#4C5172">
          <Text color="white" fontSize="xl">
            {data.deposit}
          </Text>
          <Text color="white" fontSize="md">
            Total Deposit
          </Text>
        </VStack>
        <VStack alignItems="center" w="25%">
          <Text color="white" fontSize="xl">
            {data.proposal}
          </Text>
          <Text color="white" fontSize="md">
            Proposal
          </Text>
        </VStack>
      </HStack>

      <Box>
        <Text color="white" fontSize="md">
          {data.description}
        </Text>
      </Box>
    </VStack>
  );
};

export default UserInfo;
