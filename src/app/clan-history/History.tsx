import Header from '@/components/Header';
import HisOfProposal from '@/components/HisOfProposal';
import Layout from '@/components/Layout';
import SentFund from '@/components/SentFund';
import Vote from '@/components/Vote';
import { Routers } from '@/constants/Routers';
import { useMyRoute } from '@/navigator/Navigation';
import { ScrollView, VStack } from 'native-base';
import React, { useCallback } from 'react';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

const edges: Edge[] = ['bottom'];
const ClanHistory: React.FC = () => {
  const { params } = useMyRoute<Routers.ClanHistoryScreen>();
  console.log(params);
  const { publicKey: proposalAccount, account: proposal } = params;

  const onVoteForPress = useCallback(() => {
    console.log('onVoteForPress');
  }, []);

  const onVoteAgainstPress = useCallback(() => {
    console.log('onVoteAgainstPress');
  }, []);

  return (
    <Layout>
      <VStack h="100%" backgroundColor="transparent">
        <Header title="Proposal" canGoBack />
        <ScrollView px="5">
          <SafeAreaView edges={edges}>
            <SentFund
              proposalAccount={proposalAccount}
              onVoteForPress={onVoteForPress}
              onVoteAgainstPress={onVoteAgainstPress}
              proposal={proposal}
            />
            <Vote />
            <Vote isVoteFor={false} />
            <HisOfProposal />
          </SafeAreaView>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default ClanHistory;
