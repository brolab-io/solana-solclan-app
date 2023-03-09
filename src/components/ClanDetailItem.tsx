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
  vote: string;
  isJoined: boolean;
};

type Props = {
  data: ClanDetailItemType;
};

const ClanDetailItem: React.FC<Props> = ({ data }: Props) => {
  return (
    <VStack borderTopRadius={24} overflow="hidden" space="2">
      <Image src={data.image} alt={data.title} w="100%" h={200} resizeMode="cover" />
      <Text color="white" fontSize="xl">
        {data.title}
      </Text>

      <HStack justifyContent="flex-start">
        <HStack alignItems="center" space="2">
          <Image
            src={data.author.avatar}
            alt={data.author.name}
            w={10}
            h={10}
            borderRadius="full"
          />
          <VStack>
            <Text color="#9498AA" fontSize="md">
              Founder
            </Text>
            <Text color="white" fontSize="md">
              {data.author.name}
            </Text>
          </VStack>
        </HStack>
      </HStack>

      <Box>
        <Text color="#9498AA" fontSize="md">
          {data.content}
        </Text>
      </Box>
    </VStack>
  );
};

export default ClanDetailItem;
