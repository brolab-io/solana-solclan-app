import { ClanData } from '@/configs/programs';
import { VStack } from 'native-base';
import React, { PropsWithChildren } from 'react';
import CardItem from './CardItem';

type Props = {
  data: ClanData[];
  onPress: (item: ClanData) => void;
};
const CardItems: React.FC<PropsWithChildren<Props>> = ({ data, onPress }) => {
  return (
    <VStack space="5">
      {data.map(item => (
        <CardItem key={item.id} item={item} onPress={() => onPress(item)} />
      ))}
    </VStack>
  );
};

export default CardItems;
