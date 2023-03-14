import { ProposalData, solClanIDL, solClanProgramId } from '@/configs/programs';
import useProgram from '@/lib/solana/hooks/useProgram';
import { formatPublicKey } from '@/lib/solana/utils';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { encode } from 'bs58';
import { Box, HStack, Image, Text, VStack } from 'native-base';
import React, { PropsWithChildren } from 'react';
import Button from './Button';

type Props = {
  proposalAccount: PublicKey;
  proposal: ProposalData;
  onVoteForPress?: () => void;
  onVoteAgainstPress?: () => void;
};

const SentFund: React.FC<PropsWithChildren<Props>> = ({
  onVoteForPress,
  onVoteAgainstPress,
  proposalAccount,
  proposal,
}) => {
  const { program } = useProgram(solClanIDL, solClanProgramId);
  const { data: voteCount } = useQuery(
    ['proposals', 'vote-count', proposalAccount.toBase58()],
    async () => {
      const filters: Parameters<typeof program.account.ballot.all>[0] = [
        {
          memcmp: {
            offset: 8,
            bytes: encode(proposalAccount.toBuffer()),
          },
        },
      ];
      return program.account.ballot.all(filters).then(ballots => ballots.length);
    },
  );
  return (
    <VStack pt="2" space="3">
      <Text color="white" fontSize="md">
        Return Accidentally Sent Funds
      </Text>
      <HStack w="100%" justifyContent="space-between" alignItems="center">
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
            {(voteCount || 0).toString().padStart(3, '0')}
          </Text>
        </Button>
        <Box w="1%" my="1" borderLeftColor="#4A5568" borderLeftWidth="1">
          <Text color="transparent">|</Text>
        </Box>

        <Text color="white" fontSize="md" fontWeight="bold">
          12:30 A.M 9/9/2021
        </Text>
      </HStack>

      <HStack
        space="3"
        p="3"
        rounded="3xl"
        alignItems="center"
        justifyContent="center"
        borderWidth="1"
        borderColor="#2D3748">
        <Image
          src={
            'https://img.freepik.com/free-vector/gradient-liquid-abstract-background_23-2148916599.jpg?t=st=1678333832~exp=1678334432~hmac=f21042037b2f420a4a0622f622a7f471eadbb21578d453c4e5c44b9bc07bbf82'
          }
          alt="avatar"
          w="12"
          h="12"
          rounded="full"
        />
        <VStack>
          <Text color="#4299E1" fontSize="md">
            {formatPublicKey(proposal.author, 8)}
          </Text>
          <Text color="white" fontSize="md">
            Created 12:30 A.M 9/9/2021
          </Text>
        </VStack>
      </HStack>
      <HStack w="100%" space="3">
        <Button flex={1} py="5" backgroundColor="#215BF0" rounded="2xl" onPress={onVoteForPress}>
          <Text color="white" fontSize="md" fontWeight="bold">
            Vote For
          </Text>
        </Button>
        <Button
          flex={1}
          py="5"
          backgroundColor="#F56565"
          rounded="2xl"
          onPress={onVoteAgainstPress}>
          <Text color="white" fontSize="md" fontWeight="bold">
            Vote Against
          </Text>
        </Button>
      </HStack>
    </VStack>
  );
};

export default SentFund;
