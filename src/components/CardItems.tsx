import { VStack } from 'native-base';
import React, { PropsWithChildren } from 'react';
import CardItem, { CardItemType } from './CardItem';

type Props = {
  data: CardItemType[];
  onPress: (item: CardItemType) => void;
};
const CardItems: React.FC<PropsWithChildren<Props>> = ({ data, onPress }) => {
  return (
    <VStack space="5">
      {data.map((item: CardItemType) => (
        <CardItem key={item.id} {...item} onPress={() => onPress(item)} />
      ))}
    </VStack>
  );
};

export default CardItems;
