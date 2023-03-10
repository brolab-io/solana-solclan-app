import React, { PropsWithChildren, useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { Box, HStack, Image, Input, ScrollView, Text, VStack } from 'native-base';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import useProgram from '@/lib/solana/hooks/useProgram';
import { solClanIDL } from '@/configs/programs';
import Button from '@/components/Button';
import usePublicKey from '@/lib/solana/hooks/usePublicKey';
import useSignAndSendTransaction from '@/lib/solana/hooks/useSignAndSendTransaction';
import { BN, web3 } from '@project-serum/anchor';
import useConnection from '@/lib/solana/hooks/useConnection';
import { findClanAccount, findClanCardAccount, findClanMemberAccount } from '@/configs/pdas';

const CreateClanScreen: React.FC<PropsWithChildren> = () => {
  const { program } = useProgram(solClanIDL, '7SuqbkN8yMTXqQPdoUQ1DksQqGE6QKoeaC2j6N7cNmAF');
  const publicKey = usePublicKey();
  const signAndSendTransaction = useSignAndSendTransaction();
  const connection = useConnection();

  // State
  const [name, setName] = useState('Feng Shui');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateClan = useCallback(async () => {
    if (!publicKey) {
      return console.log('[CreateClanScreen]', 'handleCreateClan: No public key');
    }
    const random0To9 = Math.floor(Math.random() * 10);
    const clanId = new BN(`10${new Date().getTime()}${random0To9}`);

    try {
      const clanAccount = findClanAccount(clanId);
      const memberAccount = findClanMemberAccount(clanId, publicKey);
      const cardAccount = findClanCardAccount(clanId);

      const tx = await program.methods
        .createClan(clanId, name, publicKey)
        .accounts({
          authority: publicKey,
          systemProgram: web3.SystemProgram.programId,
          clan: clanAccount,
          member: memberAccount,
          card: cardAccount,
        })
        .transaction();

      tx.feePayer = publicKey;
      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      const txResult = await signAndSendTransaction(tx);
      console.log('[CreateClanScreen]', 'handleCreateClan: txResult', txResult);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Failed to create clan', error.message);
      }
      console.log('[CreateClanScreen]', 'handleCreateClan: error', error);
    }
  }, [publicKey, program.methods, name, connection, signAndSendTransaction]);

  return (
    <Layout>
      <VStack h="100%" pb="24" backgroundColor="transparent">
        <Header title="Start your clan" />
        <ScrollView keyboardDismissMode="on-drag" keyboardShouldPersistTaps="handled">
          <VStack p="6" space="6">
            <HStack space="4" alignItems="center">
              <Image
                style={styles.clanImage}
                alt="Upload Image"
                source={{ uri: 'https://picsum.photos/200/300' }}
                flex="1"
              />
              <VStack flex="2" space="3">
                <Box>
                  <Button
                    width="142px"
                    bgColor="transparent"
                    padding={0}
                    paddingX={0}
                    paddingY={0}
                    borderColor="#4C5172"
                    borderWidth={1}>
                    <Text color="white">Upload Image</Text>
                  </Button>
                </Box>
                <Text color="#9498AA">
                  Upload your clan's avatarFormat: png, jpg, gif. Max size: 2 MB
                </Text>
              </VStack>
            </HStack>
            <VStack space="3">
              <Text fontSize={18} fontWeight="semibold" color="#ffffff">
                Clan Name
              </Text>
              <Input
                fontSize={16}
                px="20px"
                py="12px"
                color="white"
                placeholderTextColor="#9498AA"
                backgroundColor="#2D3748"
                borderRadius={18}
                borderColor="transparent"
                placeholder="Enter your clan name"
                value={name}
                onChangeText={setName}
              />
            </VStack>
            <VStack space="3">
              <Text fontSize={18} fontWeight="semibold" color="#ffffff">
                Clan Email Address
              </Text>
              <Input
                fontSize={16}
                px="20px"
                py="12px"
                color="white"
                placeholderTextColor="#9498AA"
                backgroundColor="#2D3748"
                borderRadius={18}
                borderColor="transparent"
                placeholder="Enter your clan's email address"
                value={email}
                onChangeText={setEmail}
              />
            </VStack>
            <VStack space="3">
              <Text fontSize={18} fontWeight="semibold" color="#ffffff">
                Clan Description
              </Text>
              <Input
                fontSize={18}
                px="20px"
                py="12px"
                color="white"
                multiline
                minHeight={100}
                placeholderTextColor="#9498AA"
                backgroundColor="#2D3748"
                borderRadius={18}
                borderColor="transparent"
                placeholder="What's your clan all about and who are you looking for?"
                value={description}
                onChangeText={setDescription}
              />
            </VStack>

            <Button onPress={handleCreateClan}>
              <Text color="white" fontSize="xl">
                Create Clan
              </Text>
            </Button>
          </VStack>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

const styles = {
  clanImage: {
    aspectRatio: 1,
  },
};

export default CreateClanScreen;
