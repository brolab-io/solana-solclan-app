import React, { ComponentProps, PropsWithChildren } from 'react';
import { HStack, Pressable } from 'native-base';
import { Image } from 'react-native';
import { ImageSourcePropType } from 'react-native/types';

type Props = {
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  onPress?: () => void;
} & ComponentProps<typeof HStack>;

const Button: React.FC<PropsWithChildren<Props>> = ({
  children,
  leftIcon,
  rightIcon,
  onPress,
  ...props
}) => {
  return (
    <HStack
      w="100%"
      space="2"
      justifyContent="center"
      alignItems="center"
      backgroundColor="blue.600"
      py="3"
      rounded="full"
      {...props}>
      <Pressable alignItems="center" flexDirection="row" onPress={onPress}>
        {leftIcon ? <Image source={leftIcon} alt="icon" /> : null}
        {children}
        {rightIcon ? <Image source={rightIcon} alt="icon" /> : null}
      </Pressable>
    </HStack>
  );
};

export default Button;
