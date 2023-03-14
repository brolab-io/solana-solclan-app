import { ClanData, solClanIDL, solClanProgramId } from '@/configs/programs';
import useProgram from '@/lib/solana/hooks/useProgram';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { encode } from 'bs58';
import { HStack, Text, VStack } from 'native-base';
import React, { PropsWithChildren, useEffect } from 'react';
import MemberJoinItem from '../MemberJoinItem';

type Props = {
  item: ClanData;
  clanPublicKey: PublicKey | null;
};
const TabMemberList: React.FC<PropsWithChildren<Props>> = ({ item, clanPublicKey }) => {
  const { program } = useProgram(solClanIDL, solClanProgramId);
  const { data: members, isLoading } = useQuery(['member', 'list-member', item], async () => {
    if (!item || !clanPublicKey) {
      return [];
    }

    return program.account.member.all([
      {
        memcmp: {
          offset: 8,
          bytes: encode(clanPublicKey?.toBuffer()),
        },
      },
    ]);
  });

  useEffect(() => {
    console.log('members', members);
  }, [members]);

  return (
    <VStack>
      <HStack justifyContent="space-between">
        <Text color="#9498AA" fontSize="md">
          Name
        </Text>
        <Text color="#9498AA" fontSize="md">
          Day Joined
        </Text>
        <Text color="#9498AA" fontSize="md">
          Vote Power
        </Text>
      </HStack>
      {isLoading && <Text color="white">Loading...</Text>}
      {!isLoading &&
        members?.map((item, index) => {
          return <MemberJoinItem key={index} item={item} />;
        })}
    </VStack>
  );
};

export default TabMemberList;
