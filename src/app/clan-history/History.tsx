import Header from '@/components/Header';
import Layout from '@/components/Layout';
import SentFund from '@/components/SentFund';
import { ScrollView, VStack } from 'native-base';
import React from 'react';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

const edges: Edge[] = ['bottom'];
const ClanHistory = () => {
  return (
    <Layout>
      <VStack h="100%" backgroundColor="transparent">
        <Header title="Proposal" canGoBack />
        <ScrollView px="5">
          <SafeAreaView edges={edges}>
            <SentFund />
          </SafeAreaView>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default ClanHistory;
