import ButtonTab, { ButtonType } from '@/components/ButtonTab';
import ClanDetailInfoTab from '@/components/ClanDetailInfoTab';
import ClanDetailItem from '@/components/ClanDetailItem';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { ScrollView, VStack } from 'native-base';
import React, { PropsWithChildren } from 'react';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

const dataItem = {
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
  return (
    <Layout>
      <VStack h="100%" backgroundColor="transparent">
        <Header title="Details" canGoBack />
        <ScrollView mt="5">
          <SafeAreaView edges={bottomEdge}>
            <VStack px="5">
              <ClanDetailItem {...dataItem} />
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
              <ClanDetailInfoTab />
            </VStack>
          </SafeAreaView>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default ClanDetail;
