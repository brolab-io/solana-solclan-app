import { Box, HStack, VStack } from 'native-base';
import React, { PropsWithChildren } from 'react';
import { ClanData } from '@/configs/programs';
import MyClanItem from './MyClanItem';

type Props = {
  clanItems: ClanData[];
  onItemPress: (clan: ClanData) => void;
};

const MyClanItems: React.FC<PropsWithChildren<Props>> = ({ clanItems, onItemPress }) => {
  return (
    <VStack alignItems="center">
      <Box w="100%" px="10px" pt="10px" justifyContent="center" alignItems="center">
        <HStack flexWrap="wrap" justifyContent="flex-start" alignItems="center">
          {clanItems.map(item => {
            return <MyClanItem key={item.id} item={item} onItemPress={onItemPress} />;
          })}
        </HStack>
      </Box>
    </VStack>
  );
};

export default MyClanItems;
