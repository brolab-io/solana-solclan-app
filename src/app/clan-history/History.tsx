import Header from '@/components/Header';
import HisOfProposal from '@/components/HisOfProposal';
import Layout from '@/components/Layout';
import SentFund from '@/components/SentFund';
import Vote from '@/components/Vote';
import { ScrollView, VStack } from 'native-base';
import React, { useCallback } from 'react';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

const edges: Edge[] = ['bottom'];
const ClanHistory = () => {
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
            <SentFund onVoteForPress={onVoteForPress} onVoteAgainstPress={onVoteAgainstPress} />
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
