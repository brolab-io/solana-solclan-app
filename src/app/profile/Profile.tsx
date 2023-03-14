import Header from '@/components/Header';
import Layout from '@/components/Layout';
import MyClanItems from '@/components/MyClanItems';
import UserInfo from '@/components/UserInfo';
import { Routers } from '@/constants/Routers';
import useProgram from '@/lib/solana/hooks/useProgram';
import usePublicKey from '@/lib/solana/hooks/usePublicKey';
import { useMyNavigation } from '@/navigator/Navigation';
import { Box, ScrollView, VStack } from 'native-base';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { ClanData, solClanProgramId, solClanIDL } from '@/configs/programs';
import { useQuery } from '@tanstack/react-query';
import { encode } from 'bs58';
import ButtonTab, { ButtonType } from '@/components/ButtonTab';
import TabProposalListItems from '@/components/ClanDetail/TabProposalListItems';

const bottomEdge: Edge[] = ['bottom'];

const tabData: ButtonType[] = [
  {
    label: 'Clans',
  },
  {
    label: 'Proposal',
  },
];

const userData = {
  avatar:
    'https://img.freepik.com/free-vector/gradient-liquid-abstract-background_23-2148916599.jpg?t=st=1678333832~exp=1678334432~hmac=f21042037b2f420a4a0622f622a7f471eadbb21578d453c4e5c44b9bc07bbf82',
  description: 'Hello world I’m a Hot boyz, I’m from Viet Nam and love to invest on a good stuff',
};

const ProfileScreen: React.FC<PropsWithChildren> = () => {
  const { navigate } = useMyNavigation();
  const publicKey = usePublicKey();
  const { program } = useProgram(solClanIDL, solClanProgramId);

  const [tabselected, setTabSelected] = useState(0);
  const [clansData, setClansData] = useState<ClanData[]>([]);

  const { data: clans } = useQuery(['clans', 'owner'], async () => {
    const U64_SIZE = 8;
    if (publicKey === null) {
      return [];
    }

    return program.account.clan
      .all([
        {
          memcmp: {
            offset: 8 + U64_SIZE,
            bytes: encode(publicKey.toBuffer()),
          },
        },
      ])
      .then(data => data.map(item => item.account));
  });

  const {
    data: proposals,
    error,
    isLoading,
  } = useQuery(['proposal', 'owner'], async () => {
    const U64_SIZE = 8;
    const PUBLICKEY_SIZE = 32;
    if (publicKey === null) {
      return [];
    }

    return program.account.proposal.all([
      {
        memcmp: {
          offset: 8 + U64_SIZE + PUBLICKEY_SIZE,
          bytes: encode(publicKey.toBuffer()),
        },
      },
    ]);
  });

  useEffect(() => {
    setClansData(clans || []);
  }, [clans]);

  const onItemPress = useCallback(
    (clan: ClanData) => {
      navigate(Routers.ClanDetailScreen, { item: clan });
    },
    [navigate],
  );

  return (
    <Layout>
      <VStack h="100%" pb="24" backgroundColor="transparent">
        <Header title="My account" isIconTitle={false} />
        <ScrollView>
          <SafeAreaView edges={bottomEdge}>
            <UserInfo data={userData} proposals={proposals} />
            <VStack alignItems="center" justifyContent="center">
              <ButtonTab
                w="50%"
                borderRadius="full"
                borderColor="#4C5172"
                borderWidth="1"
                p="1"
                justifyContent="space-between"
                data={tabData}
                selected={tabselected}
                onChangeTab={setTabSelected}
              />
              <Box w="100%" h="1" px="5">
                <Box borderTopColor="#4C5172" borderTopWidth="1" w="100%" />
              </Box>
            </VStack>

            {tabselected === 0 ? (
              <MyClanItems clanItems={clansData} onItemPress={onItemPress} />
            ) : null}

            {tabselected === 1 ? (
              <Box px="5">
                <TabProposalListItems
                  error={error}
                  isLoading={isLoading}
                  proposalAccounts={proposals}
                />
              </Box>
            ) : null}
          </SafeAreaView>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default ProfileScreen;
