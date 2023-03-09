import {Box, HStack, Image, Text, VStack} from 'native-base';
import React from 'react';

type AuthorType = {
  avatar: string;
  name: string;
};

export type CardItemType = {
  id: string;
  image: string;
  title: string;
  author: AuthorType;
  currentPrice: number;
};
const CardItem: React.FC<CardItemType> = ({image, title, author, currentPrice}: CardItemType) => {
  return (
    <VStack borderRadius={24} overflow="hidden" pb="3" backgroundColor="#252939">
      <Image src={image} alt={title} w="100%" h={200} />
      <Box m="3" borderBottomColor="#7C87B1" borderBottomWidth="1" pb="2">
        <Text color="white" fontSize="xl">
          {title}
        </Text>
      </Box>
      <HStack justifyContent="space-around">
        <VStack p="3" space="2">
          <Text color="#9498AA" fontSize="md">
            Founder
          </Text>
          <HStack alignItems="center" space="2">
            <Image src={author.avatar} alt={author.name} w={10} h={10} borderRadius="full" />
            <Text color="white" fontSize="md">
              {author.name}
            </Text>
          </HStack>
        </VStack>
        <VStack p="3" space="2" justifyContent="space-around">
          <Text color="#9498AA" fontSize="md">
            Current Treasury
          </Text>
          <HStack alignItems="center" space="2" justifyContent="flex-end">
            <Image
              source={require('../../assets/sol_balance.png')}
              alt={author.name}
              w={6}
              h={6}
              borderRadius="full"
            />
            <Text color="white" fontSize="md">
              {currentPrice} SOL
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default CardItem;
