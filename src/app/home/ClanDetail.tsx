import ButtonTab, { ButtonType } from '@/components/ButtonTab';
import ClanDetailTab from '@/components/ClanDetailTab';
import ClanDetailItem, { ClanDetailItemType } from '@/components/ClanDetailItem';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { ScrollView, VStack } from 'native-base';
import React, { PropsWithChildren, useCallback } from 'react';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { SheetManager } from 'react-native-actions-sheet';
import { ACTION_SHEET } from '@/constants/ActionSheet';

const dataItem: ClanDetailItemType = {
  id: '2',
  image:
    'https://img.freepik.com/free-vector/gradient-liquid-abstract-background_23-2148916599.jpg?t=st=1678333832~exp=1678334432~hmac=f21042037b2f420a4a0622f622a7f471eadbb21578d453c4e5c44b9bc07bbf82',
  title: 'Brolab & Friends',
  author: {
    avatar: 'https://picsum.photos/200/300',
    name: '@LeoPham',
  },
  currentPrice: 100,
  content:
    'Brolab Clan is a community of early-stage investors focused on supporting innovative startups in the technology sector.',
  vote: '22/50',
  isJoined: true,
};

const tabData: ButtonType[] = [
  {
    label: 'Infor',
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
  const [selected, setSelected] = React.useState(0);

  const onJoinOrDeposit = useCallback((isJoined: boolean) => {
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
              <ClanDetailItem data={dataItem} />
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
              <ClanDetailTab
                tabselected={selected}
                data={dataItem}
                onJoinOrDeposit={onJoinOrDeposit}
              />
            </VStack>
          </SafeAreaView>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default ClanDetail;
