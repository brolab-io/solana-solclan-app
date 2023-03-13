import React, { PropsWithChildren, useCallback, useState, useMemo } from 'react';
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
import useProgram from '@/lib/solana/hooks/useProgram';
import { solClanIDL, solClanProgramId } from '@/configs/programs';
import { findClanAccount } from '@/configs/pdas';
import usePublicKey from '@/lib/solana/hooks/usePublicKey';
import { useQuery } from '@tanstack/react-query';
import useJoinClanMutation from '@/hooks/mutations/useJoinClanMutation';
import { checkIsMemberOfClan } from '@/lib/solana/utils';

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
  const publicKey = usePublicKey();
  const { program } = useProgram(solClanIDL, solClanProgramId);
  const {
    params: { item: clanFromRoute },
  } = useMyRoute<Routers.ClanDetailScreen>();

  const { data: clan } = useQuery(
    ['clan', clanFromRoute.id.toString()],
    async () => {
      const clanAccount = findClanAccount(clanFromRoute.id);
      return program.account.clan.fetch(clanAccount);
    },
    {
      initialData: clanFromRoute,
    },
  );

  const { mutateAsync: joinClan, isLoading: isJoiningClan } = useJoinClanMutation();

  const clanAccount = useMemo(() => {
    if (!publicKey) {
      return null;
    }
    return findClanAccount(clan.id);
  }, [clan.id, publicKey]);

  const {
    data: member,
    isLoading: isLoadingMember,
    refetch: refetchMember,
  } = useQuery(
    ['clanMember', clanAccount?.toBase58()],
    () => {
      return checkIsMemberOfClan(program, clanAccount!, publicKey!);
    },
    {
      enabled: !!clanAccount && !!publicKey,
    },
  );
  const hasJoined = !!member;
  const onJoinOrDeposit = useCallback(async () => {
    if (hasJoined) {
      SheetManager.show(ACTION_SHEET.DEPOSIT);
    } else {
      await joinClan({
        id: clan.id,
      });
      await refetchMember();
    }
  }, [hasJoined, clan.id, joinClan, refetchMember]);

  return (
    <Layout>
      <VStack h="100%" backgroundColor="transparent">
        <Header title="Details" canGoBack />
        <ScrollView mt="5">
          <SafeAreaView edges={bottomEdge}>
            <VStack px="5">
              <ClanDetailItem item={clan} />
              <ButtonTab
                borderRadius="full"
                borderColor="#4C5172"
                borderWidth="1"
                p="1"
                justifyContent="space-between"
                data={tabData}
                selected={selected}
                onChangeTab={setSelected}
              />
              <ClanDetailTab
                isLoading={isLoadingMember || isJoiningClan}
                hasJoined={hasJoined}
                tabselected={selected}
                item={clan}
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
