import React from 'react';
import { Flex, Heading, HStack } from 'native-base';

type Props = {
  label?: string;
};

const BlockError: React.FC<Props> = ({ label }) => {
  return (
    <Flex minHeight={120} justifyContent="center" alignItems="center">
      <HStack space={2} justifyContent="center">
        <Heading color="red.400" fontSize="md">
          {label || 'Failed to load data'}
        </Heading>
      </HStack>
    </Flex>
  );
};

export default BlockError;
