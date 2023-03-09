import React, {PropsWithChildren} from 'react';
import {Box, ScrollView, VStack} from 'native-base';
import ButtonTab, {ButtonType} from '@/components/ButtonTab';
import CardItems from '@/components/CardItems';
import {CardItemType} from '@/components/CardItem';
import Header from '@/components/Header';
import {ImageBackground} from 'react-native';
import Layout from '@/components/Layout';

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
const HomeScreen: React.FC<PropsWithChildren> = () => {
  const [selected, setSelected] = React.useState(0);

  return (
    <Layout>
      <VStack h="100%" pb="24" backgroundColor="transparent">
        <Header title="SOLCLAN" />
        <ScrollView>
          <VStack px="5">
            <ButtonTab data={tabData} selected={selected} tabSelected={setSelected} />
            <CardItems data={cardData} />
          </VStack>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default HomeScreen;
