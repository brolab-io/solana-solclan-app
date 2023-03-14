import { findClanAccount } from '@/configs/pdas';
import { ClanData } from '@/configs/programs';
import { formatPublicKey, formatSOL } from '@/lib/solana/utils';
import { getImage } from '@/services/Web3Storage.service';
import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';

export type AuthorType = {
  avatar: string;
  name: string;
};

export type CardItemProps = {
  item: ClanData;
  onPress?: () => void;
};
const CardItem: React.FC<CardItemProps> = ({ onPress, item }: CardItemProps) => {
  const [image, setImage] = useState<string>('https://picsum.photos/200/300');

  useEffect(() => {
    getImage(item.uri).then(res => {
      setImage(res.image);
    });
  }, [item.uri]);

  return (
    <Pressable onPress={onPress}>
      <VStack borderRadius={24} overflow="hidden" pb="3" backgroundColor="#252939">
        <Image src={image} alt={item.name} w="100%" h={200} resizeMode="cover" />
        <Box m="3" borderBottomColor="#7C87B1" borderBottomWidth="1" pb="2">
          <Text color="white" fontSize="2xl">
            {item.name || 'No Name'}
          </Text>
          <Text color="#aaa" fontSize="xs">
            {formatPublicKey(findClanAccount(item.id))} (#{item.id.toString()})
          </Text>
        </Box>
        <HStack justifyContent="space-around">
          <VStack p="3" space="2">
            <Text color="#9498AA" fontSize="md">
              Founder
            </Text>
            <HStack alignItems="center" space="2">
              <Image
                src="https://picsum.photos/200/300"
                alt={formatPublicKey(item.creator)}
                w={10}
                h={10}
                borderRadius="full"
              />
              <Text color="white" fontSize="md">
                {formatPublicKey(item.creator)}
              </Text>
            </HStack>
          </VStack>
          <VStack p="3" space="2" justifyContent="space-around">
            <Text color="#9498AA" fontSize="md">
              Current Treasury
            </Text>
            <HStack alignItems="center" space="2" justifyContent="flex-end">
              <Image
                source={require('../assets/sol_balance.png')}
                alt="Sol Icon"
                w={6}
                h={6}
                borderRadius="full"
              />
              <Text color="white" fontSize="md">
                {formatSOL(item.power)} SOL
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Pressable>
  );
};

export default CardItem;
