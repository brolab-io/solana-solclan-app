import React, { PropsWithChildren, useCallback, useState } from 'react';
import { Alert } from 'react-native';
import {
  Box,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
  Button as NativeBaseButton,
} from 'native-base';
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import { BN } from '@project-serum/anchor';
import useCreateClanMutation from '@/hooks/mutations/useCreateClanMutation';
import { useMyNavigation } from '@/navigator/Navigation';
import { Routers } from '@/constants/Routers';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadImage, uploadMetadata } from '@/services/Web3Storage.service';

const CreateClanScreen: React.FC<PropsWithChildren> = () => {
  const [name, setName] = useState('Feng Shui');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const { mutateAsync, isLoading } = useCreateClanMutation();
  const navigation = useMyNavigation();

  const [nftImage, setNftImage] = useState<string>(
    'https://bpsdm.dephub.go.id/v2/public/file_app/struktur_image/default.png',
  );

  const handleCreateClan = useCallback(async () => {
    const random0To9 = Math.floor(Math.random() * 10);
    const id = new BN(`10${new Date().getTime()}${random0To9}`);

    const image_cid = await uploadImage(nftImage);
    const metadata_cid = await uploadMetadata(image_cid, name, description, 'LEOPHAM');
    console.log('metadata_cid: ', metadata_cid);
    try {
      const clan = await mutateAsync({
        id,
        name,
        description,
        email,
      });
      navigation.navigate(Routers.MainTabScreen);
      navigation.navigate(Routers.ClanDetailScreen, { item: clan });
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Failed to create clan', error.message);
      }
      console.log('[CreateClanScreen]', 'handleCreateClan: error', error);
    }
  }, [nftImage, name, description, mutateAsync, email, navigation]);

  const onPressAvatarUpload = useCallback(async () => {
    const avatarPath = await ImagePicker.openPicker({
      cropping: true,
      multiple: false,
      mediaType: 'photo',
      cropperCircleOverlay: true,
      compressImageQuality: 1,
    }).catch(err => {
      console.log('Avatar cancel: ', err);
    });

    if (!avatarPath) {
      return;
    }
    setNftImage(avatarPath.path);
  }, []);

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
                source={{ uri: nftImage }}
                flex="1"
              />
              <VStack flex="2" space="3">
                <Box>
                  <Button
                    onPress={onPressAvatarUpload}
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
                isDisabled={isLoading}
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
                isDisabled={isLoading}
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
                isDisabled={isLoading}
              />
            </VStack>
            <NativeBaseButton
              rounded="full"
              shadow="6"
              bg="#543bd6"
              isLoading={isLoading}
              py="12px"
              onPress={handleCreateClan}>
              <Text color="white" fontSize="xl">
                Create Clan
              </Text>
            </NativeBaseButton>
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
