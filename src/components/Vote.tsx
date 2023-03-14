import { ProposalData, solClanIDL, solClanProgramId } from '@/configs/programs';
import useProgram from '@/lib/solana/hooks/useProgram';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { encode } from 'bs58';
import { Box, HStack, Text, VStack } from 'native-base';
import React, { useMemo } from 'react';
import Button from './Button';
import ListVoteItems from './Proposal/ListVoteItems';
import { BN } from '@project-serum/anchor';

type Props = {
  isVoteFor?: boolean;
  isHash?: boolean;
  proposalAccount: PublicKey;
  proposalData: ProposalData;
  shouldShowHash?: boolean;
};

const Vote: React.FC<Props> = ({
  isVoteFor = true,
  proposalAccount,
  proposalData,
  shouldShowHash = true,
}) => {
  const { program } = useProgram(solClanIDL, solClanProgramId);
  const {
    data: ballots,
    isLoading,
    error,
  } = useQuery(['proposals', 'votes', proposalAccount.toBase58(), isVoteFor ? 1 : 0], async () => {
    const filters: Parameters<typeof program.account.ballot.all>[0] = [
      {
        memcmp: {
          offset: 8,
          bytes: encode(proposalAccount.toBuffer()),
        },
      },
      {
        memcmp: {
          offset: 8 + 32 + 32,
          bytes: encode(Buffer.from([isVoteFor ? 1 : 0])),
        },
      },
    ];
    return program.account.ballot.all(filters);
  });

  const percent = useMemo(() => {
    if (proposalData.votes.eq(new BN(0))) {
      return 0;
    }
    if (isVoteFor) {
      return proposalData.yesVotes.mul(new BN(100)).div(proposalData.votes);
    }
    return proposalData.noVotes.mul(new BN(100)).div(proposalData.votes);
  }, [isVoteFor, proposalData.noVotes, proposalData.votes, proposalData.yesVotes]);

  return (
    <VStack backgroundColor="#1A202C" rounded="2xl" p="5" space="5" mt="5">
      <HStack justifyContent="space-between">
        <Text color="white" fontSize="lg">
          {isVoteFor ? 'Vote For' : 'Vote Against'}
        </Text>
        <Text color="white" fontSize="lg">
          {(proposalData[isVoteFor ? 'yesVotes' : 'noVotes'].toNumber() / LAMPORTS_PER_SOL).toFixed(
            2,
          )}
        </Text>
      </HStack>
      <Box w="100%" h="10px" backgroundColor="#4A5568" rounded="full">
        <Box
          w={`${Math.floor(percent.toNumber())}%`}
          h="10px"
          backgroundColor={isVoteFor ? '#215BF0' : '#F56565'}
          rounded="full"
        />
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
          {shouldShowHash ? (
            <Text flex={1} color="#718096" fontSize="lg" textAlign="center">
              Hash
            </Text>
          ) : null}

          <Text flex={1} color="#718096" fontSize="lg" textAlign="right">
            Vote
          </Text>
        </HStack>
        <ListVoteItems isLoading={isLoading} error={error} ballots={ballots} />
      </VStack>
      {ballots?.length ? (
        <Button backgroundColor="#2D3748" rounded="2xl">
          <Text color="white" fontSize="md" fontWeight="bold">
            View All
          </Text>
        </Button>
      ) : null}
    </VStack>
  );
};

export default Vote;
