import { Text, VStack } from 'native-base';
import React from 'react';
import DotWithContent from './DotWithContent';

type Props = {};
const HisOfProposal: React.FC<Props> = ({}) => {
  return (
    <VStack backgroundColor="#1A202C" rounded="2xl" p="5" space="5" mt="5">
      <Text color="#FFFFFF" fontSize="2xl">
        History of Proprosal
      </Text>
      <VStack>
        <DotWithContent content="Created" time_at="12:30 A.M 9/9/2021" />
        <DotWithContent content="Active" time_at="12:30 A.M 9/9/2021" />
        <DotWithContent content="Running" time_at="12:30 A.M 9/9/2021" isContinueEnable={false} />
        <DotWithContent content="Queued" isOn={false} />
        <DotWithContent content="Executed" isOn={false} isContinue={false} />
      </VStack>
    </VStack>
  );
};

export default HisOfProposal;
