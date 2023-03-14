import React from 'react';
import { ProposalData } from '@/configs/programs';
import TabProposalListItem from './TabProposalListItem';
import BlockLoading from '../BlockLoading';
import BlockError from '../BlockError';
import BlockEmpty from '../BlockEmpty';
import { ProgramAccount } from '@project-serum/anchor';

type Props = {
  isLoading: boolean;
  error: unknown;
  proposalAccounts?: ProgramAccount<ProposalData>[];
};

const TabProposalListItems: React.FC<Props> = ({ isLoading, error, proposalAccounts }) => {
  if (isLoading) {
    return <BlockLoading label="Fetching proposals..." />;
  }
  if (error) {
    return <BlockError label="Failed to fetch proposals" />;
  }
  if (!proposalAccounts || !proposalAccounts.length) {
    return <BlockEmpty label="No proposals found" />;
  }
  return (
    <>
      {(proposalAccounts || []).map(proposalAccount => (
        <TabProposalListItem
          key={proposalAccount.publicKey.toString()}
          proposalAccount={proposalAccount}
        />
      ))}
    </>
  );
};

export default TabProposalListItems;
