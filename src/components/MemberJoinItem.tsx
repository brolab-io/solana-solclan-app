import React from 'react';
import { HStack, Image, Text } from 'native-base';
import { PropsWithChildren } from 'react';
import { MemberData } from '@/configs/programs';
import { formatPublicKey } from '@/lib/solana/utils';
import { ProgramAccount } from '@project-serum/anchor';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

type Props = {
  item: ProgramAccount<MemberData>;
};

const MemberJoinItem: React.FC<PropsWithChildren<Props>> = ({ item }) => {
  return (
    <HStack justifyContent="space-between" mt="2">
      <HStack alignItems="center" space="1" flex={1}>
        <Image
          source={require('../assets/sol_balance.png')}
          alt="sol_balance"
          w={8}
          h={8}
          borderRadius="full"
        />
        <Text color="white" fontSize="xs">
          {formatPublicKey(item.account.wallet, 2).toString()}
        </Text>
      </HStack>

      <HStack alignItems="center" flex={2} pl="4">
        <Text color="white" fontSize="xs">
          {new Date(item.account.timestamp.toString() * 1000).toDateString()}
        </Text>
      </HStack>

      <HStack alignItems="center" justifyContent="flex-end" flex={1}>
        <Text color="white" fontSize="xs">
          {item.account.power / LAMPORTS_PER_SOL} SOL
        </Text>
      </HStack>
    </HStack>
  );
};

export default MemberJoinItem;
