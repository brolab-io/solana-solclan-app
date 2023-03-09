import React, { PropsWithChildren } from 'react';
import { Box, HStack, Image, Text, VStack } from 'native-base';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import { useMyNavigation } from '@/navigator/Navigation';
import useProgram from '@/lib/solana/hooks/useProgram';
import { solClanIDL } from '@/configs/programs/solscan';
import Button from '@/components/Button';

const CreateClanScreen: React.FC<PropsWithChildren> = () => {
  const { navigate } = useMyNavigation();
  const { program } = useProgram(solClanIDL, '7SuqbkN8yMTXqQPdoUQ1DksQqGE6QKoeaC2j6N7cNmAF');

  return (
    <Layout>
      <VStack h="100%" pb="24" backgroundColor="transparent">
        <Header title="Start your clan" />
        <Box p="6">
          <HStack space="4" alignItems="center">
            <Image
              style={styles.clanImage}
              alt="Upload Image"
              source={{ uri: 'https://picsum.photos/200/300' }}
              flex="1"
            />
            <VStack flex="2" space="3">
              <Box>
                <Button>
                  <Text>Upload Image</Text>
                </Button>
              </Box>
              <Text color="#9498AA">
                Upload your clan's avatarFormat: png, jpg, gif. Max size: 2 MB
              </Text>
            </VStack>
          </HStack>
        </Box>
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
