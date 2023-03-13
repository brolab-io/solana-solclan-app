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
import { encode } from 'bs58';
import usePublicKey from '@/lib/solana/hooks/usePublicKey';

const tabData: ButtonType[] = [
  {
    label: 'Explore',
  },
  {
    label: 'My Clan',
  },
];

const bottomEdge: Edge[] = ['bottom'];

const HomeScreen: React.FC<PropsWithChildren> = () => {
  const publicKey = usePublicKey();
  const { navigate } = useMyNavigation();
  const [selectedTab, setSelectedTab] = useState(0);

  const { program } = useProgram(solClanIDL, solClanProgramId);
  const {
    data: clans,
    isLoading,
    error,
  } = useQuery(['clans', 'all', selectedTab], async () => {
    if (selectedTab === 0) {
      return program.account.clan.all().then(data => data.map(item => item.account));
    }

    //
    const filters: Parameters<typeof program.account.clan.all>[0] = [];
    if (selectedTab === 1) {
      if (!publicKey) {
        return [];
      }

      const PUBLIC_KEY_SIZE = 32;
      filters.push({
        memcmp: {
          offset: 8 + PUBLIC_KEY_SIZE,
          bytes: encode(publicKey.toBuffer()),
        },
      });
    }
    const members = await program.account.member.all(filters);
    const clanAccounts = members.map(item => item.account.clan);
    const clanAccountsData = await Promise.all(
      clanAccounts.map(account => program.account.clan.fetch(account)),
    );
    return clanAccountsData;
  });

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
          <ButtonTab mx="5" data={tabData} selected={selectedTab} onChangeTab={setSelectedTab} />
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
