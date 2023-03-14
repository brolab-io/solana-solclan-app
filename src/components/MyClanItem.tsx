import { widthDimensions } from '@/common/Demension';
import { ClanData } from '@/configs/programs';
import { getImage } from '@/services/Web3Storage.service';
import { Box, Image, Pressable, Text } from 'native-base';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';

type Props = {
  item: ClanData;
  onItemPress: (clan: ClanData) => void;
};
const MyClanItem: React.FC<PropsWithChildren<Props>> = ({ item, onItemPress }) => {
  const [image, setImage] = useState<string>('https://picsum.photos/200/300');
  const onPress = useCallback(() => {
    onItemPress(item);
  }, [item, onItemPress]);

  useEffect(() => {
    getImage(item.uri).then(res => {
      setImage(res.image);
    });
  }, [item.uri]);

  return (
    <Pressable
      px="10px"
      py="10px"
      key={item.id}
      position="relative"
      onPress={onPress}
      w={`${widthDimensions(150, 20)}px`}>
      <Image
        rounded="3xl"
        alt="clan"
        w={`${widthDimensions(150, 20)}px`}
        h={`${widthDimensions(150, 20)}px`}
        src={image}
      />
      {item ? (
        <Box position="absolute" top="5" left="5" px="3" backgroundColor="red.500" rounded="lg">
          <Text color="white" fontSize="sm">
            New
          </Text>
        </Box>
      ) : null}
    </Pressable>
  );
};

export default MyClanItem;
