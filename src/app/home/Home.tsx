import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { ScrollView, VStack } from 'native-base';
import ButtonTab, { ButtonType } from '@/components/ButtonTab';
import CardItems from '@/components/CardItems';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { useMyNavigation } from '@/navigator/Navigation';
import { Routers } from '@/constants/Routers';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import useProgram from '@/lib/solana/hooks/useProgram';
import { ClanData, solClanIDL } from '@/configs/programs';

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
  const { program } = useProgram(solClanIDL, '7SuqbkN8yMTXqQPdoUQ1DksQqGE6QKoeaC2j6N7cNmAF');
  const [clans, setClans] = useState<ClanData[]>([]);

  const [selected, setSelected] = useState(0);

  const fetchClans = useCallback(async () => {
    const result = await program.account.clan.all();
    setClans(result.map(item => item.account));
  }, [program]);

  useEffect(() => {
    fetchClans();
  }, [fetchClans]);

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
              <CardItems data={clans} onPress={itemPress} />
            </VStack>
          </SafeAreaView>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default HomeScreen;
