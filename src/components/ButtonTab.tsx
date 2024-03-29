import { HStack, Text } from 'native-base';
import React, { ComponentProps, PropsWithChildren } from 'react';
import Button from './Button';

export type ButtonType = {
  label: string;
};

type Props = {
  data: ButtonType[];
  selected: number;
  onChangeTab: (index: number) => void;
} & ComponentProps<typeof HStack>;

const ButtonTab: React.FC<PropsWithChildren<Props>> = ({
  data,
  selected,
  onChangeTab,
  ...props
}: Props) => {
  return (
    <HStack mb="5" mt="5" {...props}>
      {data.map((item, index) => (
        <Button
          w="auto"
          px="4"
          key={item.label}
          onPress={() => onChangeTab(index)}
          backgroundColor={selected === index ? 'blue.600' : 'transparent'}>
          <Text color="white" fontSize="sm">
            {item.label}
          </Text>
        </Button>
      ))}
    </HStack>
  );
};

export default ButtonTab;
