import React from 'react';
import Header from '@/components/Header';
import HisOfProposal from '@/components/HisOfProposal';
import Layout from '@/components/Layout';
import SentFund from '@/components/SentFund';
import Vote from '@/components/Vote';
import { Routers } from '@/constants/Routers';
import { useMyRoute } from '@/navigator/Navigation';
import { ScrollView, VStack } from 'native-base';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { solClanIDL, solClanProgramId } from '@/configs/programs';
import useProgram from '@/lib/solana/hooks/useProgram';

const edges: Edge[] = ['bottom'];

const ClanHistory: React.FC = () => {
  const { params } = useMyRoute<Routers.ClanHistoryScreen>();
  const { publicKey: proposalAccount, account: _proposal } = params;
  const { program } = useProgram(solClanIDL, solClanProgramId);
  const { data: proposal } = useQuery(
    ['proposals', 'item', proposalAccount.toBase58()],
    () => {
      return program.account.proposal.fetch(proposalAccount);
    },
    {
      initialData: _proposal,
    },
  );

  return (
    <Layout>
      <VStack h="100%" backgroundColor="transparent">
        <Header title="Proposal" canGoBack />
        <ScrollView px="5">
          <SafeAreaView edges={edges}>
            <SentFund proposalAccount={proposalAccount} proposal={proposal} />
            <Vote proposalAccount={proposalAccount} proposalData={proposal} />
            <Vote proposalAccount={proposalAccount} proposalData={proposal} isVoteFor={false} />
            <HisOfProposal proposalData={proposal} />
          </SafeAreaView>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default ClanHistory;
