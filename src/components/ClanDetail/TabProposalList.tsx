import React, { useCallback } from 'react';
import { VStack, HStack, Text } from 'native-base';
import plus_icon from '../../assets/plus_icon.png';
import Button from '../Button';
import { useQuery } from '@tanstack/react-query';
import useProgram from '@/lib/solana/hooks/useProgram';
import { ClanData, solClanIDL, solClanProgramId } from '@/configs/programs';
import { findClanAccount } from '@/configs/pdas';
import { encode } from 'bs58';
import { useMyNavigation } from '@/navigator/Navigation';
import { Routers } from '@/constants/Routers';
import TabProposalListItems from './TabProposalListItems';

type Props = {
  item: ClanData;
};

const TabProposalList: React.FC<Props> = ({ item }) => {
  const { navigate } = useMyNavigation();
  const { program } = useProgram(solClanIDL, solClanProgramId);

  const { data, isLoading, error } = useQuery(
    ['proposals', item.id.toString(), 'all'],
    async () => {
      const clanAccount = findClanAccount(item.id);
      const filters: Parameters<typeof program.account.proposal.all>[0] = [
        {
          memcmp: {
            offset: 8 + 8,
            bytes: encode(clanAccount.toBuffer()),
          },
        },
      ];
      return program.account.proposal.all(filters);
    },
  );

  const addNewProposal = useCallback(() => {
    navigate(Routers.CreateProposalScreen, { item });
  }, [item, navigate]);

  return (
    <VStack>
      <HStack borderBottomColor="#2D3748" borderBottomWidth="1" pb="5">
        <Button w="80%" onPress={addNewProposal} leftIcon={plus_icon}>
          <Text color="white" fontSize="md" fontWeight="bold">
            Add New Proposals
          </Text>
        </Button>
      </HStack>
      <TabProposalListItems error={error} isLoading={isLoading} proposalAccounts={data} />
    </VStack>
  );
};

export default TabProposalList;
