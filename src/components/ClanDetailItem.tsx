import { Box, HStack, Image, Text, VStack } from 'native-base';
import React from 'react';
import { AuthorType } from './CardItem';

export type ClanDetailItemType = {
  id: string;
  image: string;
  title: string;
  author: AuthorType;
  content: string;
  currentPrice: number;
};

const ClanDetailItem: React.FC<ClanDetailItemType> = ({ image, title, author, content }) => {
  return (
    <VStack borderTopRadius={24} overflow="hidden" space="2">
      <Image src={image} alt={title} w="100%" h={200} resizeMode="cover" />
      <Text color="white" fontSize="xl">
        {title}
      </Text>

      <HStack justifyContent="flex-start">
        <HStack alignItems="center" space="2">
          <Image src={author.avatar} alt={author.name} w={10} h={10} borderRadius="full" />
          <VStack>
            <Text color="#9498AA" fontSize="md">
              Founder
            </Text>
            <Text color="white" fontSize="md">
              {author.name}
            </Text>
          </VStack>
        </HStack>
      </HStack>

      <Box>
        <Text color="#9498AA" fontSize="md">
          {content}
        </Text>
      </Box>
    </VStack>
  );
};

export default ClanDetailItem;
