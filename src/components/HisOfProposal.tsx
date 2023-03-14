import { ProposalData } from '@/configs/programs';
import { formatTime } from '@/lib/solana/utils';
import { Text, VStack } from 'native-base';
import React, { useState, useEffect } from 'react';
import DotWithContent from './DotWithContent';

type Props = {
  proposalData: ProposalData;
};
const HisOfProposal: React.FC<Props> = ({ proposalData }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <VStack backgroundColor="#1A202C" rounded="2xl" p="5" space="5" mt="5">
      <Text color="#FFFFFF" fontSize="2xl">
        History of Proprosal
      </Text>
      <VStack>
        <DotWithContent content="Created" time_at={formatTime(proposalData.createdAt)} />
        <DotWithContent content="Active" time_at={formatTime(proposalData.startAt)} />
        <DotWithContent content="Running" time_at={formatTime(date)} isContinueEnable={false} />
        <DotWithContent content="Queued" isOn={false} />
        <DotWithContent content="Executed" isOn={false} isContinue={false} />
      </VStack>
    </VStack>
  );
};

export default HisOfProposal;
