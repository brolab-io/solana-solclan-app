import Header from '@/components/Header';
import MyInput from '@/components/Input';
import Layout from '@/components/Layout';
import { Box, Button, HStack, ScrollView, Text, VStack } from 'native-base';
import React, { useCallback } from 'react';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import calen_icon from '@/assets/calen_icon.png';
import useCreateProposalMutation from '@/hooks/mutations/useCreateProposalMutation';
import { BN } from '@project-serum/anchor';
import { useMyRoute } from '@/navigator/Navigation';
import { Routers } from '@/constants/Routers';

const edges: Edge[] = ['bottom'];

const CreateProposal: React.FC = () => {
  const {
    params: { item },
  } = useMyRoute<Routers.CreateProposalScreen>();
  const { mutateAsync, isLoading: isCreatingProposal } = useCreateProposalMutation();

  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [link, setLink] = React.useState<string>('');
  const [startTime, setStartTime] = React.useState<Date>(new Date());
  const [endTime, setEndTime] = React.useState<Date>(new Date());

  const onNameChange = useCallback((value: string | Date) => {
    setTitle(value.toString());
  }, []);

  const onDescriptionChange = useCallback((value: string | Date) => {
    setDescription(value.toString());
  }, []);

  const onLinkChange = useCallback((value: string | Date) => {
    setLink(value.toString());
  }, []);

  const onStartTimeChange = useCallback((value: string | Date) => {
    setStartTime(new Date(value));
  }, []);

  const onEndTimeChange = useCallback((value: string | Date) => {
    setEndTime(new Date(value));
  }, []);

  const handleCreateProposal = useCallback(async () => {
    const random0To9 = Math.floor(Math.random() * 10);
    const proposalId = new BN(`10${new Date().getTime()}${random0To9}`);
    await mutateAsync({
      clanId: item.id,
      proposalId,
      title,
      description,
      startAt: new BN(Math.floor(startTime.getTime() / 1000)),
      endAt: new BN(Math.floor(endTime.getTime() / 1000)),
      amount: new BN(100),
    });
  }, [description, endTime, item.id, mutateAsync, startTime, title]);

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
                onChange={onNameChange}
                title="Proposal title"
                placeholder="Name of proposal"
              />
              <MyInput
                value={description}
                onChange={onDescriptionChange}
                isMultiLine
                title="Proposal Description"
                placeholder="Write proposal description here"
              />

              <HStack flex={1} space="3">
                <Box flex={1}>
                  <MyInput
                    value={startTime}
                    onChange={onStartTimeChange}
                    type="date"
                    title="Start time"
                    placeholder="Start"
                    rightIcon={calen_icon}
                  />
                </Box>
                <Box flex={1}>
                  <MyInput
                    value={endTime}
                    onChange={onEndTimeChange}
                    type="date"
                    title="End Time"
                    placeholder="End"
                    rightIcon={calen_icon}
                  />
                </Box>
              </HStack>

              <MyInput
                value={link}
                onChange={onLinkChange}
                title="Link"
                placeholder="Name of proposal"
              />

              <Button
                h="54px"
                isLoading={isCreatingProposal}
                onPress={handleCreateProposal}
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
