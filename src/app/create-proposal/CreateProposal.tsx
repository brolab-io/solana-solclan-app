import Header from '@/components/Header';
import MyInput from '@/components/Input';
import Layout from '@/components/Layout';
import { Box, Button, HStack, ScrollView, Text, useToast, VStack } from 'native-base';
import React, { useCallback } from 'react';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import calen_icon from '@/assets/calen_icon.png';
import useCreateProposalMutation from '@/hooks/mutations/useCreateProposalMutation';
import { BN } from '@project-serum/anchor';
import { useMyNavigation, useMyRoute } from '@/navigator/Navigation';
import { Routers } from '@/constants/Routers';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getMutationMessage } from '@/lib/solana/utils';
import { solClanIDL } from '@/configs/programs';
import { Alert } from 'react-native';
import { queryClient } from '@/configs/query.client';

const edges: Edge[] = ['bottom'];

const CreateProposal: React.FC = () => {
  const {
    params: { item },
  } = useMyRoute<Routers.CreateProposalScreen>();
  const { goBack } = useMyNavigation();

  const { mutateAsync, isLoading: isCreatingProposal } = useCreateProposalMutation();

  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [amount, setAmount] = React.useState<string>('');
  const [startTime, setStartTime] = React.useState<Date>(new Date());
  const [endTime, setEndTime] = React.useState<Date>(new Date());
  const toast = useToast();
  const handleCreateProposal = useCallback(async () => {
    const random0To9 = Math.floor(Math.random() * 10);
    const proposalId = new BN(`10${new Date().getTime()}${random0To9}`);
    try {
      await mutateAsync({
        clanId: item.id,
        proposalId,
        title,
        description,
        startAt: new BN(Math.floor(startTime.getTime() / 1000)),
        endAt: new BN(Math.floor(endTime.getTime() / 1000)),
        amount: new BN(parseFloat(amount.replace(',', '.')) * LAMPORTS_PER_SOL),
      });
      queryClient.invalidateQueries(['proposals', item.id.toString(), 'all']);
      goBack();

      toast.show({
        title: 'Create proposal successfully',
        description: 'Your proposal has been created successfully',
      });
    } catch (error) {
      Alert.alert('Failed to create proposal', getMutationMessage(error, solClanIDL));
    }
  }, [amount, description, endTime, goBack, item.id, mutateAsync, startTime, title, toast]);

  return (
    <Layout>
      <VStack h="100%" backgroundColor="transparent">
        <Header title="Create proposal" canGoBack />
        <ScrollView px="5">
          <SafeAreaView edges={edges}>
            <VStack space="5">
              {/* <MyInput
                value={selected}
                onChange={onSelectedChange}
                title="Proposal type"
                placeholder="Select type"
                type="select"
                selectData={[
                  { label: 'Type 1', value: '1' },
                ]}
              /> */}
              <MyInput
                value={title}
                onChange={setTitle}
                title="Proposal title"
                placeholder="Name of proposal"
              />
              <MyInput
                value={description}
                onChange={setDescription}
                isMultiLine
                title="Proposal Description"
                placeholder="Write proposal description here"
              />

              <HStack flex={1} space="3">
                <Box flex={1}>
                  <MyInput
                    value={startTime}
                    onChange={setStartTime}
                    type="date"
                    title="Start time"
                    placeholder="Start"
                    rightIcon={calen_icon}
                  />
                </Box>
                <Box flex={1}>
                  <MyInput
                    value={endTime}
                    onChange={setEndTime}
                    type="date"
                    title="End Time"
                    placeholder="End"
                    rightIcon={calen_icon}
                  />
                </Box>
              </HStack>

              <MyInput
                value={amount}
                onChange={setAmount}
                title="Total votes"
                keyboardType="decimal-pad"
                placeholder="Total of votes"
              />

              <Button
                h="54px"
                isLoading={isCreatingProposal}
                onPress={handleCreateProposal}
                isLoadingText="Creating proposal"
                rounded="full"
                backgroundColor="#215BF0">
                <Text color="white" fontSize="md" fontWeight="bold">
                  Create Proposal
                </Text>
              </Button>
            </VStack>
          </SafeAreaView>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default CreateProposal;
