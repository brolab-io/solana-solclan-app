import React from 'react';
import { Flex, Heading } from 'native-base';

type Props = {
  label?: string;
};

const BlockEmpty: React.FC<Props> = ({ label }) => {
  return (
    <Flex minHeight={120} justifyContent="center" alignItems="center">
      <Heading color="coolGray.600" fontSize="md">
        {label || 'No data available'}
      </Heading>
    </Flex>
  );
};

export default BlockEmpty;
