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
import { findClanAccount, findClanMemberAccount } from '@/configs/pdas';
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
    params: { item },
  } = useMyRoute<Routers.ClanDetailScreen>();
  const { mutateAsync: joinClan } = useJoinClanMutation();

  const memberAccount = useMemo(() => {
    if (!publicKey) {
      return null;
    }
    const clanAccount = findClanAccount(item.id);
    return findClanMemberAccount(clanAccount, publicKey);
  }, [item.id, publicKey]);

  const {
    data: member,
    isLoading: isLoadingMember,
    refetch: refetchMember,
  } = useQuery(
    ['clanMember', memberAccount],
    () => {
      return checkIsMemberOfClan(program, memberAccount!, publicKey!);
    },
    {
      enabled: !!memberAccount && !!publicKey,
    },
  );
  const hasJoined = !!member;
  const onJoinOrDeposit = useCallback(async () => {
    if (hasJoined) {
      SheetManager.show(ACTION_SHEET.DEPOSIT);
    } else {
      await joinClan({
        id: item.id,
      });
      await refetchMember();
    }
  }, [hasJoined, item.id, joinClan, refetchMember]);

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
              <ClanDetailTab
                isLoadingMember={isLoadingMember}
                hasJoined={hasJoined}
                tabselected={selected}
                item={item}
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
