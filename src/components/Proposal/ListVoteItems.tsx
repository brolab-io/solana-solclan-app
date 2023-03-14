import React from 'react';
import { ProposalData } from '@/configs/programs';
import BlockLoading from '../BlockLoading';
import BlockError from '../BlockError';
import BlockEmpty from '../BlockEmpty';
import { HStack, Text } from 'native-base';
import { ProgramAccount } from '@project-serum/anchor';
import { formatPublicKey } from '@/lib/solana/utils';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

type Props = {
  isLoading: boolean;
  error: unknown;
  ballots?: ProgramAccount<ProposalData>[];
};

const ListVoteItems: React.FC<Props> = ({ isLoading, error, ballots }) => {
  if (isLoading) {
    return <BlockLoading label="Fetching votes..." />;
  }
  if (error) {
    return <BlockError label="Failed to fetch votes" />;
  }
  if (!ballots || !ballots.length) {
    return <BlockEmpty label="No votes found" />;
  }

  return (
    <>
      {(ballots || []).map(ballot => (
        <HStack
          key={ballot.publicKey.toString()}
          justifyContent="space-between"
          borderBottomColor="#2D3748"
          borderBottomWidth="1"
          flex={1}
          py="3">
          <Text flex={1} color="#FFFFFF" fontSize="md">
            {formatPublicKey(ballot.publicKey.toString(), 3)}
          </Text>
          <Text flex={2} color="#4299E1" fontSize="md" textAlign="center">
            {formatPublicKey(ballot.publicKey.toString(), 3)}
          </Text>
          <Text flex={1} color="#FFFFFF" fontSize="md" textAlign="right">
            {(ballot.account.amount.toNumber() / LAMPORTS_PER_SOL).toFixed(2)}
          </Text>
        </HStack>
      ))}
    </>
  );
};

export default ListVoteItems;
