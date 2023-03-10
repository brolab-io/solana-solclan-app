import React from 'react';
import { Flex, Heading, HStack, Spinner } from 'native-base';

type Props = {
  label?: string;
};

const BlockLoading: React.FC<Props> = ({ label }) => {
  return (
    <Flex minHeight={120} justifyContent="center" alignItems="center">
      <HStack space={2} justifyContent="center">
        <Spinner accessibilityLabel="Loading..." />
        <Heading color="primary.500" fontSize="md">
          {label || 'Loading...'}
        </Heading>
      </HStack>
    </Flex>
  );
};

export default BlockLoading;
