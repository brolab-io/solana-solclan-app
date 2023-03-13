import React, { useCallback } from 'react';
import { VStack, HStack, Box, Text } from 'native-base';

import plus_icon from '../../assets/plus_icon.png';
import check_icon from '../../assets/check_icon.png';
import dot_icon from '../../assets/dot_icon.png';
import { useMyNavigation } from '@/navigator/Navigation';
import { Routers } from '@/constants/Routers';
import Button from '../Button';
import { useQuery } from '@tanstack/react-query';
// import { BN } from '@project-serum/anchor';
import useProgram from '@/lib/solana/hooks/useProgram';
import { ClanData, solClanIDL, solClanProgramId } from '@/configs/programs';
import { findClanAccount } from '@/configs/pdas';
import { encode } from 'bs58';

type Props = {
  item: ClanData;
};

const TabProposalList: React.FC<Props> = ({ item }) => {
  const { navigate } = useMyNavigation();
  const { program } = useProgram(solClanIDL, solClanProgramId);
  const { data } = useQuery(['proposals', item.id.toString(), 'all'], async () => {
    const clanAccount = findClanAccount(item.id);
    const filters: Parameters<typeof program.account.proposal.all>[0] = [
      {
        memcmp: {
          offset: 8,
          bytes: encode(clanAccount.toBuffer()),
        },
      },
    ];
    return program.account.proposal.all(filters).then(proposals =>
      proposals.map(proposal => {
        return program.account.proposal.fetch(proposal.publicKey);
      }),
    );
  });

  console.log(data);

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
      <VStack borderBottomColor="#2D3748" borderBottomWidth="1" pt="2" pb="5" space="3">
        <Text color="white" fontSize="md">
          We should invite more people
        </Text>
        <HStack w="100%" justifyContent="space-between">
          <Button
            w="30%"
            py="1"
            backgroundColor="transparent"
            borderWidth="1"
            borderColor="#1AC486"
            rounded="14">
            <Text color="#1AC486" fontSize="md" fontWeight="bold">
              Passed
            </Text>
          </Button>
          <Button w="20%" backgroundColor="#4A5568" rounded="14" py="1">
            <Text color="white" fontSize="md" fontWeight="bold">
              058
            </Text>
          </Button>
          <Box w="1%" my="1" borderLeftColor="#4A5568" borderLeftWidth="1" />

          <Button
            w="30%"
            space="4"
            backgroundColor="transparent"
            rounded="14"
            leftIcon={check_icon}
            py="1">
            <Text color="#1AC486" fontSize="md" fontWeight="bold">
              Executed
            </Text>
          </Button>
        </HStack>
        <Text color="#718096" fontSize="md" fontWeight="bold">
          12:30 A.M 8/3/2023
        </Text>
      </VStack>

      <VStack borderBottomColor="#2D3748" borderBottomWidth="1" pt="2" pb="5" space="3">
        <Text color="white" fontSize="md">
          Invest on Solend private round
        </Text>
        <HStack w="100%" justifyContent="space-between">
          <Button
            w="30%"
            py="1"
            backgroundColor="transparent"
            borderWidth="1"
            borderColor="#805AD5"
            rounded="14">
            <Text color="#805AD5" fontSize="md" fontWeight="bold">
              Running
            </Text>
          </Button>
          <Button w="20%" backgroundColor="#4A5568" rounded="14" py="1">
            <Text color="white" fontSize="md" fontWeight="bold">
              058
            </Text>
          </Button>
          <Box w="1%" my="1" borderLeftColor="#4A5568" borderLeftWidth="1" />

          <Button
            w="30%"
            space="4"
            backgroundColor="transparent"
            rounded="14"
            leftIcon={dot_icon}
            py="1">
            <Text color="#805AD5" fontSize="md" fontWeight="bold">
              Queue
            </Text>
          </Button>
        </HStack>
        <Text color="#718096" fontSize="md" fontWeight="bold">
          12:30 A.M 9/9/2021
        </Text>
      </VStack>
    </VStack>
  );
};

export default TabProposalList;
