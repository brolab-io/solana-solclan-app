import React, { PropsWithChildren, useCallback, useState } from 'react';
import { ScrollView, VStack } from 'native-base';
import ButtonTab, { ButtonType } from '@/components/ButtonTab';
import CardItems from '@/components/CardItems';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { useMyNavigation } from '@/navigator/Navigation';
import { Routers } from '@/constants/Routers';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { ClanData, solClanProgramId, solClanIDL } from '@/configs/programs';
import useProgram from '@/lib/solana/hooks/useProgram';
import { useQuery } from '@tanstack/react-query';

const tabData: ButtonType[] = [
  {
    label: 'My Clan',
  },
  {
    label: 'Explore',
  },
];

const bottomEdge: Edge[] = ['bottom'];

const HomeScreen: React.FC<PropsWithChildren> = () => {
  const { navigate } = useMyNavigation();

  const { program } = useProgram(solClanIDL, solClanProgramId);
  const {
    data: clans,
    isLoading,
    error,
  } = useQuery(['clans', 'all'], () => program.account.clan.all(), {
    select: data => data.map(item => item.account),
  });

  const [selected, setSelected] = useState(0);

  const itemPress = useCallback(
    (item: ClanData) => {
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
              <CardItems data={clans} isLoading={isLoading} error={error} onPress={itemPress} />
            </VStack>
          </SafeAreaView>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default HomeScreen;
