import Button from '@/components/Button';
import Header from '@/components/Header';
import MyInput from '@/components/Input';
import Layout from '@/components/Layout';
import { Box, HStack, ScrollView, Text, VStack } from 'native-base';
import React from 'react';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
const calen_icon = require('@/assets/calen_icon.png');

const edges: Edge[] = ['bottom'];
const CreateProposal: React.FC = () => {
  return (
    <Layout>
      <VStack h="100%" backgroundColor="transparent">
        <Header title="Create proposal" canGoBack />
        <ScrollView px="5">
          <SafeAreaView edges={edges}>
            <VStack space="5">
              <MyInput title="Proposal type" placeholder="Select type" type="select" />
              <MyInput title="Proposal title" placeholder="Name of proposal" />
              <MyInput
                isMultiLine
                title="Proposal Description"
                placeholder="Write proposal description here"
              />

              <HStack flex={1} space="3">
                <Box flex={1}>
                  <MyInput title="Start time" placeholder="Start" rightIcon={calen_icon} />
                </Box>
                <Box flex={1}>
                  <MyInput title="End Time" placeholder="End" rightIcon={calen_icon} />
                </Box>
              </HStack>

              <MyInput title="Link" placeholder="Name of proposal" />

              <Button onPress={() => null} rounded="full" backgroundColor="#215BF0">
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
