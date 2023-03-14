import { ClanData } from '@/configs/programs';
import { VStack } from 'native-base';
import React, { PropsWithChildren } from 'react';
import BlockEmpty from './BlockEmpty';
import BlockError from './BlockError';
import BlockLoading from './BlockLoading';
import CardItem from './CardItem';

type Props = {
  data: ClanData[] | undefined;
  error: unknown;
  isLoading: boolean;
  onPress: (item: ClanData) => void;
};
const CardItems: React.FC<PropsWithChildren<Props>> = ({ data, error, isLoading, onPress }) => {
  if (isLoading) {
    return <BlockLoading label="Fetching clans..." />;
  }
  if (error) {
    return <BlockError label="Failed to load data" />;
  }
  if (!data) {
    return null;
  }
  if (!data.length) {
    return <BlockEmpty label="No clan available" />;
  }
  return (
    <VStack space="5">
      {data.map(item => (
        <CardItem key={item.id} item={item} onPress={() => onPress(item)} />
      ))}
    </VStack>
  );
};

export default CardItems;
