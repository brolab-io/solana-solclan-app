import usePublicKey from '@/lib/solana/hooks/usePublicKey';
import { useMyNavigation } from '@/navigator/Navigation';
import { HStack, Image, Pressable, Text } from 'native-base';
import React from 'react';

type Props = {
  canGoBack?: boolean;
  title: string;
  isIconTitle?: boolean;
};
const Header: React.FC<Props> = ({ canGoBack = false, title, isIconTitle = true }: Props) => {
  const { goBack } = useMyNavigation();
  const publicKey = usePublicKey()?.toBase58() || '';
  return (
    <>
      {!canGoBack ? (
        <HStack py="1" justifyContent="space-between" px="5" alignItems="flex-end">
          <HStack space="1" alignItems="center">
            {isIconTitle ? (
              <Image source={require('../assets/sol_icon.png')} alt="solclan" w={8} h={8} />
            ) : null}
            <Text color="white" fontSize="xl">
              {title}
            </Text>
          </HStack>
          <HStack alignItems="center" space="2">
            <Text color="white" fontSize="xl">
              {publicKey.slice(0, 5)}...{publicKey.slice(-5)}
            </Text>
            <Image source={require('../assets/menu.png')} alt="solclan" w={6} h={6} />
          </HStack>
        </HStack>
      ) : null}
      {canGoBack ? (
        <HStack py="1" px="5" alignItems="flex-end" justifyContent="space-between">
          <Pressable onPress={goBack}>
            <Image source={require('../assets/back.png')} alt="solclan" w={8} h={8} />
          </Pressable>
          <Text color="white" fontSize="xl">
            {title}
          </Text>
          <Image source={require('../assets/more.png')} alt="solclan" w={6} h={6} />
        </HStack>
      ) : null}
    </>
  );
};

export default Header;
