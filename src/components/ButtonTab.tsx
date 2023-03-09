import {HStack, Text} from 'native-base';
import React, {ComponentProps, PropsWithChildren} from 'react';
import Button from './Button';

export type ButtonType = {
  label: string;
};

type Props = {
  data: ButtonType[];
  selected: number;
  tabSelected: (index: number) => void;
} & ComponentProps<typeof HStack>;

const ButtonTab: React.FC<PropsWithChildren<Props>> = ({
  data,
  selected,
  tabSelected,
  ...props
}: Props) => {
  return (
    <HStack mt="10" {...props}>
      {data.map((item, index) => (
        <Button
          mb="5"
          w="auto"
          px="6"
          key={item.label}
          onPress={() => tabSelected(index)}
          backgroundColor={selected === index ? 'blue.600' : 'transparent'}>
          <Text color="white" fontSize="md">
            {item.label}
          </Text>
        </Button>
      ))}
    </HStack>
  );
};

export default ButtonTab;
