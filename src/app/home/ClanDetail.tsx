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
import { useMyNavigation, useMyRoute } from '@/navigator/Navigation';
import useProgram from '@/lib/solana/hooks/useProgram';
import { solClanIDL, solClanProgramId } from '@/configs/programs';
import { findClanAccount, findClanMemberAccount } from '@/configs/pdas';
import usePublicKey from '@/lib/solana/hooks/usePublicKey';
import { useQuery } from '@tanstack/react-query';

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
  const { navigate } = useMyNavigation();
  const [selected, setSelected] = useState(0);
  const publicKey = usePublicKey();
  const { program } = useProgram(solClanIDL, solClanProgramId);
  const {
    params: { item },
  } = useMyRoute<Routers.ClanDetailScreen>();

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
    error,
  } = useQuery(['clanMember', memberAccount], async () => {
    if (!memberAccount) {
      return null;
    }
    return await program.account.member.fetch(memberAccount);
  });

  const hasJoined = useMemo(() => {
    if (!member) {
      return false;
    }
    if (error instanceof Error && error.message.includes('Account does not exist or has no data')) {
      return false;
    }
    return true;
  }, [error, member]);

  const onJoinOrDeposit = useCallback(() => {
    if (hasJoined) {
      SheetManager.show(ACTION_SHEET.DEPOSIT);
    }
  }, [hasJoined]);

  const addNewProposal = useCallback(() => {
    navigate(Routers.CreateProposalScreen);
  }, [navigate]);

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
                onJoinOrDeposit={onJoinOrDeposit}
                addNewProposal={addNewProposal}
              />
            </VStack>
          </SafeAreaView>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default ClanDetail;
