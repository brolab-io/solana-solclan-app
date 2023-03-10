import { Box, HStack, Image, Text, VStack } from 'native-base';
import React, { PropsWithChildren, useState } from 'react';
import ButtonTab, { ButtonType } from './ButtonTab';

const tabData: ButtonType[] = [
  {
    label: 'Clan',
  },
  {
    label: 'Proposal',
  },
];

type Props = {
  data: any;
};
const UserInfo: React.FC<PropsWithChildren<Props>> = ({ data }) => {
  const [selected, setSelected] = useState(0);

  return (
    <VStack px="10" mt="10">
      <HStack space="10" alignItems="center">
        <Image src={data.avatar} alt="avatar" w="24" h="24" rounded="full" />
        <VStack>
          <Text color="white" fontSize="2xl">
            {data.name}
          </Text>
          <Text color="white" fontSize="md">
            {data.nick_name}
          </Text>
        </VStack>
      </HStack>

      <HStack mt="5" justifyContent="space-between">
        <VStack justifyContent="center" alignItems="center" w="25%">
          <Text color="white" fontSize="2xl">
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
          <Text color="white" fontSize="2xl">
            {data.deposit}
          </Text>
          <Text color="white" fontSize="md">
            Total Deposit
          </Text>
        </VStack>
        <VStack justifyContent="center" alignItems="center" w="25%">
          <Text color="white" fontSize="2xl">
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

      <Box>
        <ButtonTab
          borderRadius="full"
          borderColor="#4C5172"
          borderWidth="1"
          p="1"
          justifyContent="space-between"
          data={tabData}
          selected={selected}
          tabSelected={setSelected}
        />
      </Box>
    </VStack>
  );
};

export default UserInfo;
