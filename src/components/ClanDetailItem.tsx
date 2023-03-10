import { ClanData } from '@/configs/programs';
import { formatPublicKey } from '@/lib/solana/utils';
import { Box, HStack, Image, Text, VStack } from 'native-base';
import React from 'react';

type Props = {
  item: ClanData;
};

const ClanDetailItem: React.FC<Props> = ({ item }: Props) => {
  return (
    <VStack borderTopRadius={24} overflow="hidden" space="2">
      <Image
        src="https://img.freepik.com/free-vector/gradient-liquid-abstract-background_23-2148916599.jpg?t=st=1678333832~exp=1678334432~hmac=f21042037b2f420a4a0622f622a7f471eadbb21578d453c4e5c44b9bc07bbf82"
        alt={item.name}
        w="100%"
        h={200}
        resizeMode="cover"
      />
      <Text color="white" fontSize="xl">
        {item.name}
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
              {formatPublicKey(item.creator)}
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
