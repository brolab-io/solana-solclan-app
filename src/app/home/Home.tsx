import React, { PropsWithChildren, useCallback } from 'react';
import { ScrollView, VStack } from 'native-base';
import ButtonTab, { ButtonType } from '@/components/ButtonTab';
import CardItems from '@/components/CardItems';
import { CardItemType } from '@/components/CardItem';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { useMyNavigation } from '@/navigator/Navigation';
import { Routers } from '@/constants/Routers';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

const tabData: ButtonType[] = [
  {
    label: 'My Clan',
  },
  {
    label: 'Explore',
  },
];

const cardData: CardItemType[] = [
  {
    id: '1',
    image:
      'https://img.freepik.com/free-vector/gradient-liquid-abstract-background_23-2148916599.jpg?t=st=1678333832~exp=1678334432~hmac=f21042037b2f420a4a0622f622a7f471eadbb21578d453c4e5c44b9bc07bbf82',
    title: 'Brolab & Friends',
    author: {
      avatar: 'https://picsum.photos/200/300',
      name: '@LeoPham',
    },
    currentPrice: 100,
  },
  {
    id: '2',
    image:
      'https://img.freepik.com/free-vector/gradient-liquid-abstract-background_23-2148916599.jpg?t=st=1678333832~exp=1678334432~hmac=f21042037b2f420a4a0622f622a7f471eadbb21578d453c4e5c44b9bc07bbf82',
    title: 'Brolab & Friends',
    author: {
      avatar: 'https://picsum.photos/200/300',
      name: '@LeoPham',
    },
    currentPrice: 100,
  },
];
const bottomEdge: Edge[] = ['bottom'];

const HomeScreen: React.FC<PropsWithChildren> = () => {
  const { navigate } = useMyNavigation();

  const [selected, setSelected] = React.useState(0);

  const itemPress = useCallback(
    (item: CardItemType) => {
      navigate(Routers.ClanDetailScreen, { item });
    },
    [navigate],
  );

  return (
    <Layout>
      <VStack h="100%" pb="24" backgroundColor="transparent">
        <Header title="SOLCLAN" />
        <ScrollView>
          <ButtonTab mx="5" data={tabData} selected={selected} tabSelected={setSelected} />
          <SafeAreaView edges={bottomEdge}>
            <VStack px="5">
              <CardItems data={cardData} onPress={itemPress} />
            </VStack>
          </SafeAreaView>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default HomeScreen;
