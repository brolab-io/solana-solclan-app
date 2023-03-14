import { Box, HStack, Text, VStack } from 'native-base';
import React from 'react';

type Props = {
  isOn?: boolean; //Big dot blue color or gray color
  isContinue?: boolean; //Three dot show or hide
  isContinueEnable?: boolean; // Three dot blue color or gray color
  content: string;
  time_at?: string;
};
const DotWithContent: React.FC<Props> = ({
  isOn = true,
  isContinue = true,
  isContinueEnable = true,
  content,
  time_at,
}) => {
  return (
    <VStack>
      <HStack alignItems="center" space="5">
        <Box flex={1} alignItems="center">
          <Box
            w="7"
            h="7"
            rounded="full"
            borderWidth="1"
            borderColor={isOn ? '#215BF0' : '#4A5568'}
            justifyContent="center"
            alignItems="center">
            <Box w="4" h="4" rounded="full" backgroundColor={isOn ? '#215BF0' : '#4A5568'} />
          </Box>
        </Box>
        <VStack flex={6} h="12" justifyContent="center">
          <Text color={isOn ? '#FFFFFF' : '#4A5568'} fontSize="lg" backgroundColor="blue.400">
            {content}
          </Text>
          {time_at ? (
            <Text color="#718096" fontSize="md">
              {time_at}
            </Text>
          ) : null}
        </VStack>
      </HStack>
      <HStack alignItems="center" space="5" display={isContinue ? 'flex' : 'none'}>
        <VStack flex={1} space="2" alignItems="center">
          <Box
            w="1"
            h="1"
            rounded="full"
            backgroundColor={isOn && isContinueEnable ? '#215BF0' : '#4A5568'}
          />
          <Box
            w="2"
            h="2"
            rounded="full"
            backgroundColor={isOn && isContinueEnable ? '#215BF0' : '#4A5568'}
          />
          <Box
            w="1"
            h="1"
            rounded="full"
            backgroundColor={isOn && isContinueEnable ? '#215BF0' : '#4A5568'}
          />
        </VStack>
        <Box flex={6} />
      </HStack>
    </VStack>
  );
};

export default DotWithContent;
