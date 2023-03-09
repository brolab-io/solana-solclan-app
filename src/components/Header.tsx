import {HStack, Image, Pressable, Text} from 'native-base';
import React from 'react';

type Props = {
  goBack?: () => void;
  title: string;
};
const Header: React.FC<Props> = ({goBack, title}: Props) => {
  return (
    <>
      {!goBack ? (
        <HStack h="20" justifyContent="space-between" px="5" alignItems="flex-end">
          <HStack space="1" alignItems="center">
            <Image source={require('../../assets/sol_icon.png')} alt="solclan" w={8} h={8} />
            <Text color="white" fontSize="xl">
              {title}
            </Text>
          </HStack>
          <Image source={require('../../assets/menu.png')} alt="solclan" w={6} h={6} />
        </HStack>
      ) : null}
      {goBack ? (
        <HStack h="20" px="5" alignItems="flex-end" justifyContent="space-between">
          <Pressable onPress={goBack}>
            <Image source={require('../../assets/back.png')} alt="solclan" w={8} h={8} />
          </Pressable>
          <Text color="white" fontSize="xl">
            {title}
          </Text>
          <Image source={require('../../assets/more.png')} alt="solclan" w={6} h={6} />
        </HStack>
      ) : null}
    </>
  );
};

export default Header;
