import { ProposalData, solClanIDL, solClanProgramId } from '@/configs/programs';
import useProgram from '@/lib/solana/hooks/useProgram';
import { formatPublicKey, getMutationMessage } from '@/lib/solana/utils';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { encode } from 'bs58';
import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Button as NativeBaseButton,
  useToast,
} from 'native-base';
import React, { PropsWithChildren, useCallback, useState } from 'react';
import Button from './Button';
import moment from 'moment';
import useVoteProposalMutation from '@/hooks/mutations/useVoteProposalMutation';
import { Alert } from 'react-native';
import { queryClient } from '@/configs/query.client';

type Props = {
  proposalAccount: PublicKey;
  proposal: ProposalData;
};

const SentFund: React.FC<PropsWithChildren<Props>> = ({ proposalAccount, proposal }) => {
  const { program } = useProgram(solClanIDL, solClanProgramId);
  const [votingType, setVotingType] = useState<boolean | undefined>(undefined);
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
  const toast = useToast();
  const { mutateAsync: vote, isLoading: isVoting } = useVoteProposalMutation();

  const handleVote = useCallback(
    async (_vote: boolean) => {
      setVotingType(_vote);
      try {
        await vote({
          proposalPubkey: proposalAccount,
          vote: _vote,
        });
        toast.show({
          title: 'Vote proposal',
          description: 'Vote proposal successfully',
        });
        queryClient.invalidateQueries(['proposals', 'item', proposalAccount.toBase58()]);
        // queryClient.invalidateQueries(['proposals', 'vote-count', proposalAccount.toBase58()]);
        queryClient.invalidateQueries(['proposals', 'votes', proposalAccount.toBase58(), 0]);
        queryClient.invalidateQueries(['proposals', 'votes', proposalAccount.toBase58(), 1]);
      } catch (error) {
        Alert.alert('Failed to vote proposal', getMutationMessage(error, solClanIDL));
      } finally {
        setVotingType(undefined);
      }
    },
    [proposalAccount, toast, vote],
  );

  const handleVoteFor = useCallback(() => {
    handleVote(true);
  }, [handleVote]);

  const handleVoteAgainst = useCallback(() => {
    handleVote(false);
  }, [handleVote]);

  return (
    <VStack pt="2" space="3">
      <Text color="white" fontSize="2xl">
        {proposal.title}
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
          {moment(proposal.endAt.toNumber() * 1000).format('HH:mm A DD/MM/YYYY')}
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
            {moment(proposal.createdAt.toNumber() * 1000).format('HH:mm A DD/MM/YYYY')}
          </Text>
        </VStack>
      </HStack>
      <HStack w="100%" space="3">
        <NativeBaseButton
          flex={1}
          backgroundColor="#215BF0"
          rounded="2xl"
          height="54px"
          isDisabled={isVoting}
          isLoadingText="Voting..."
          isLoading={isVoting && votingType === true}
          onPress={handleVoteFor}>
          <Text color="white" fontSize="md" fontWeight="bold">
            Vote For
          </Text>
        </NativeBaseButton>
        <NativeBaseButton
          flex={1}
          backgroundColor="#F56565"
          height="54px"
          rounded="2xl"
          isDisabled={isVoting}
          isLoadingText="Voting..."
          isLoading={isVoting && votingType === false}
          onPress={handleVoteAgainst}>
          <Text color="white" fontSize="md" fontWeight="bold">
            Vote Against
          </Text>
        </NativeBaseButton>
      </HStack>
    </VStack>
  );
};

export default SentFund;
