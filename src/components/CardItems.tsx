import {ScrollView, VStack} from 'native-base';
import React, {PropsWithChildren} from 'react';
import CardItem, {CardItemType} from './CardItem';

type Props = {
  data: CardItemType[];
};
const CardItems: React.FC<PropsWithChildren<Props>> = ({data}) => {
  return (
    <ScrollView>
      <VStack space="5">
        {data.map((item: CardItemType) => (
          <CardItem key={item.id} {...item} />
        ))}
      </VStack>
    </ScrollView>
  );
};

export default CardItems;
