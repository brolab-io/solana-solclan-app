import React, { ComponentProps, PropsWithChildren } from 'react';
import { HStack, Image, Pressable } from 'native-base';
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
      justifyContent="center"
      alignItems="center"
      backgroundColor="blue.600"
      p="3"
      rounded="full"
      {...props}>
      <Pressable onPress={onPress}>
        <HStack space={props.space || 2} justifyContent="center" alignItems="center">
          {leftIcon ? <Image source={leftIcon} alt="icon" w={7} h={7} /> : null}
          {children}
          {rightIcon ? <Image source={rightIcon} alt="icon" w={7} h={7} /> : null}
        </HStack>
      </Pressable>
    </HStack>
  );
};

export default Button;
