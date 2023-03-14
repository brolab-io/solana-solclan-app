import React, { useCallback, useMemo } from 'react';
import { VStack, HStack, Box, Text, Pressable } from 'native-base';
import check_icon from '../../assets/check_icon.png';
import dot_icon from '../../assets/dot_icon.png';
import Button from '../Button';
import { ProposalData, solClanIDL, solClanProgramId } from '@/configs/programs';
import moment from 'moment';
import useProgram from '@/lib/solana/hooks/useProgram';
import { useQuery } from '@tanstack/react-query';
import { encode } from 'bs58';
import { ProgramAccount } from '@project-serum/anchor';
import { useMyNavigation } from '@/navigator/Navigation';
import { Routers } from '@/constants/Routers';

type Props = {
  proposalAccount: ProgramAccount<ProposalData>;
};

const TabProposalListItem: React.FC<Props> = ({ proposalAccount }) => {
  const { navigate } = useMyNavigation();
  const config = useMemo(() => {
    if (proposalAccount.account.executed) {
      return {
        color: '#1AC486',
        text: 'Executed',
        icon: check_icon,
      };
    }
    return {
      color: '#805AD5',
      text: 'Running',
      icon: dot_icon,
    };
  }, [proposalAccount.account]);

  const { program } = useProgram(solClanIDL, solClanProgramId);
  const { data: voteCount } = useQuery(
    ['proposals', 'vote-count', proposalAccount.publicKey.toBase58()],
    async () => {
      const filters: Parameters<typeof program.account.ballot.all>[0] = [
        {
          memcmp: {
            offset: 8,
            bytes: encode(proposalAccount.publicKey.toBuffer()),
          },
        },
      ];
      return program.account.ballot.all(filters).then(ballots => ballots.length);
    },
  );

  const handlePress = useCallback(() => {
    navigate(Routers.ClanHistoryScreen, proposalAccount);
  }, [navigate, proposalAccount]);

  return (
    <Pressable onPress={handlePress}>
      <VStack borderBottomColor="#2D3748" borderBottomWidth="1" pt="2" pb="5" space="3">
        <Text color="white" fontSize="md">
          {proposalAccount.account.title}
        </Text>
        <HStack w="100%" justifyContent="space-between">
          <Button
            w="30%"
            py="1"
            backgroundColor="transparent"
            borderWidth="1"
            borderColor={config.color}
            rounded="14">
            <Text color={config.color} fontSize="md" fontWeight="bold">
              Passed
            </Text>
          </Button>
          <Button w="20%" backgroundColor="#4A5568" rounded="14" py="1">
            <Text color="white" fontSize="md" fontWeight="bold">
              {voteCount || 0}
            </Text>
          </Button>
          <Box w="1%" my="1" borderLeftColor="#4A5568" borderLeftWidth="1" />

          <Button
            w="30%"
            space="4"
            backgroundColor="transparent"
            rounded="14"
            leftIcon={config.icon}
            py="1">
            <Text color={config.color} fontSize="md" fontWeight="bold">
              Executed
            </Text>
          </Button>
        </HStack>
        <Text color="#718096" fontSize="md" fontWeight="bold">
          {moment(proposalAccount.account.endAt.toNumber() * 1000).format('HH:mm A DD/MM/YYYY')}
        </Text>
      </VStack>
    </Pressable>
  );
};

export default TabProposalListItem;
