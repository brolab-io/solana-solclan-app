import { findClanAccount } from '@/configs/pdas';
import { ClanData } from '@/configs/programs';
import { formatPublicKey } from '@/lib/solana/utils';
import { getImage } from '@/services/Web3Storage.service';
import { Box, HStack, Image, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';

type Props = {
  item: ClanData;
};

const ClanDetailItem: React.FC<Props> = ({ item }: Props) => {
  const [image, setImage] = useState<string>('https://picsum.photos/200/300');

  useEffect(() => {
    getImage(item.uri).then(res => {
      setImage(res.image);
    });
  }, [item.uri]);

  return (
    <VStack borderTopRadius={24} overflow="hidden" space="2">
      <Image src={image} alt={item.name} w="100%" h={200} resizeMode="cover" />
      <Text color="white" fontSize="3xl">
        {item.name}
      </Text>
      <Text color="#aaa" fontSize="xs" mt="-3">
        {formatPublicKey(findClanAccount(item.id))} (#{item.id.toString()})
      </Text>

      <HStack justifyContent="flex-start">
        <HStack alignItems="center" space="2">
          <Image
            src="https://picsum.photos/200/300"
            alt={formatPublicKey(item.creator)}
            w={10}
            h={10}
            borderRadius="full"
          />
          <VStack>
            <Text color="#9498AA" fontSize="md">
              Founder
            </Text>
            <Text color="white" fontSize="md">
              {formatPublicKey(item.creator, 8)}
            </Text>
          </VStack>
        </HStack>
      </HStack>

      <Box>
        <Text color="#9498AA" fontSize="md">
          No description provided
        </Text>
      </Box>
    </VStack>
  );
};

export default ClanDetailItem;
