import React, { PropsWithChildren, useCallback, useState } from 'react';
import ButtonTab, { ButtonType } from '@/components/ButtonTab';
import ClanDetailTab from '@/components/ClanDetailTab';
import ClanDetailItem from '@/components/ClanDetailItem';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { ScrollView, VStack } from 'native-base';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { SheetManager } from 'react-native-actions-sheet';
import { ACTION_SHEET } from '@/constants/ActionSheet';
import { Routers } from '@/constants/Routers';
import { useMyRoute } from '@/navigator/Navigation';

const tabData: ButtonType[] = [
  {
    label: 'Info',
  },
  {
    label: 'Member',
  },
  {
    label: 'History',
  },
  {
    label: 'Proposal',
  },
];

const bottomEdge: Edge[] = ['bottom'];

const ClanDetail: React.FC<PropsWithChildren> = () => {
  const [selected, setSelected] = useState(0);
  const {
    params: { item },
  } = useMyRoute<Routers.ClanDetailScreen>();

  const onJoinOrDeposit = useCallback(() => {
    // TODO: check isJoined in item
    const isJoined = false;
    if (isJoined) {
      SheetManager.show(ACTION_SHEET.DEPOSIT);
    }
  }, []);

  return (
    <Layout>
      <VStack h="100%" backgroundColor="transparent">
        <Header title="Details" canGoBack />
        <ScrollView mt="5">
          <SafeAreaView edges={bottomEdge}>
            <VStack px="5">
              <ClanDetailItem item={item} />
              <ButtonTab
                borderRadius="full"
                borderColor="#4C5172"
                borderWidth="1"
                p="1"
                justifyContent="space-between"
                data={tabData}
                selected={selected}
                tabSelected={setSelected}
              />
              <ClanDetailTab tabselected={selected} onJoinOrDeposit={onJoinOrDeposit} />
            </VStack>
          </SafeAreaView>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default ClanDetail;
