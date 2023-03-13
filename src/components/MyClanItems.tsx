import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base';
import React, { PropsWithChildren } from 'react';
import ButtonTab, { ButtonType } from './ButtonTab';
import { widthDimensions } from '@/common/Demension';

const tabData: ButtonType[] = [
  {
    label: 'Clans',
  },
  {
    label: 'Proposal',
  },
];

type Props = {
  clanItems: {
    id: string;
    isNew: boolean;
    image: string;
  }[];
  onTabSelected: (index: number) => void;
  tabSelected: number;
  onItemPress: (id: string) => void;
};

const MyClanItems: React.FC<PropsWithChildren<Props>> = ({
  clanItems,
  tabSelected = 0,
  onTabSelected,
  onItemPress,
}) => {
  return (
    <VStack alignItems="center">
      <ButtonTab
        w="50%"
        borderRadius="full"
        borderColor="#4C5172"
        borderWidth="1"
        p="1"
        justifyContent="space-between"
        data={tabData}
        selected={tabSelected}
        onChangeTab={onTabSelected}
      />
      <Box w="100%" h="1" px="5">
        <Box borderTopColor="#4C5172" borderTopWidth="1" w="100%" />
      </Box>

      <Box w="100%" px="10px" pt="10px" justifyContent="center" alignItems="center">
        <HStack flexWrap="wrap" justifyContent="flex-start" alignItems="center">
          {clanItems.map(item => {
            return (
              <Pressable
                px="10px"
                py="10px"
                key={item.id}
                position="relative"
                onPress={() => onItemPress(item.id)}
                w={`${widthDimensions(150, 20)}px`}>
                <Image
                  rounded="3xl"
                  alt="clan"
                  w={`${widthDimensions(150, 20)}px`}
                  h={`${widthDimensions(150, 20)}px`}
                  src={item.image}
                />
                {item.isNew ? (
                  <Box
                    position="absolute"
                    top="5"
                    left="5"
                    px="3"
                    backgroundColor="red.500"
                    rounded="lg">
                    <Text color="white" fontSize="sm">
                      New
                    </Text>
                  </Box>
                ) : null}
              </Pressable>
            );
          })}
        </HStack>
      </Box>
    </VStack>
  );
};

export default MyClanItems;
