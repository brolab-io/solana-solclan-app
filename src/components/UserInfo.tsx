import usePublicKey from '@/lib/solana/hooks/usePublicKey';
import { formatPublicKey } from '@/lib/solana/utils';
import { useQuery } from '@tanstack/react-query';
import { Box, HStack, Image, Text, VStack } from 'native-base';
import React, { PropsWithChildren, useMemo } from 'react';
import { solClanProgramId, solClanIDL, ProposalData } from '@/configs/programs';
import useProgram from '@/lib/solana/hooks/useProgram';
import { encode } from 'bs58';
import { ProgramAccount } from '@project-serum/anchor';

type Props = {
  data: any;
  proposals?: ProgramAccount<ProposalData>[];
};
const UserInfo: React.FC<PropsWithChildren<Props>> = ({ data, proposals }) => {
  const publicKey = usePublicKey();
  const { program } = useProgram(solClanIDL, solClanProgramId);

  const { data: itMe } = useQuery(['members', 'my-clan-join'], async () => {
    const PUBLICKEY_SIZE = 32;
    if (publicKey === null) {
      return [];
    }

    return program.account.member.all([
      {
        memcmp: {
          offset: 8 + PUBLICKEY_SIZE,
          bytes: encode(publicKey.toBuffer()),
        },
      },
    ]);
  });

  const totalDeposit = useMemo(() => {
    return itMe?.reduce((acc, item) => acc + item.account.power, 0);
  }, [itMe]);

  return (
    <VStack px="5" mt="10" space="5">
      <HStack space="5" alignItems="center">
        <Image src={data.avatar} alt="avatar" w="32" h="32" rounded="full" />
        <VStack>
          <Text color="white" fontSize="2xl">
            {publicKey ? formatPublicKey(publicKey) : 'Anonymous'}
          </Text>
          <Text color="white" fontSize="md">
            {publicKey ? formatPublicKey(publicKey) : 'anonymous'}
          </Text>
        </VStack>
      </HStack>

      <HStack justifyContent="space-between">
        <VStack justifyContent="center" alignItems="center" w="25%">
          <Text color="white" fontSize="xl">
            {itMe?.length}
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
            {totalDeposit}
          </Text>
          <Text color="white" fontSize="md">
            Total Deposit
          </Text>
        </VStack>
        <VStack alignItems="center" w="25%">
          <Text color="white" fontSize="xl">
            {proposals?.length || 0}
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
