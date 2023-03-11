import { HStack, Image, Input, Text, TextArea, VStack, Select } from 'native-base';
import React from 'react';
import { ImageSourcePropType, KeyboardTypeOptions } from 'react-native';

type Props = {
  type?: 'select' | 'input' | 'date';
  isMultiLine?: boolean;
  title: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  rightText?: string;
  rightIcon?: ImageSourcePropType;
};
const MyInput: React.FC<Props> = ({
  type = 'input',
  isMultiLine = false,
  title,
  placeholder,
  keyboardType = 'default',
  rightText,
  rightIcon,
}) => {
  return (
    <VStack space="3">
      <Text color="white" fontSize="xl">
        {title}
      </Text>

      <HStack
        w="100%"
        alignItems="center"
        space="2"
        backgroundColor="#2D3748"
        rounded={isMultiLine ? 'xl' : 'full'}>
        {type === 'input' ? (
          !isMultiLine ? (
            <Input
              keyboardType={keyboardType}
              w="85%"
              borderWidth={0}
              color="white"
              fontSize="md"
              backgroundColor="transparent"
              placeholder={placeholder}
            />
          ) : (
            <TextArea
              autoCompleteType="off"
              w="85%"
              borderWidth={0}
              color="white"
              fontSize="md"
              backgroundColor="transparent"
              placeholder={placeholder}
              numberOfLines={7}
            />
          )
        ) : null}

        {type === 'select' ? (
          <Select
            borderWidth={0}
            backgroundColor="transparent"
            selectedValue={'ux'}
            accessibilityLabel="Choose Service"
            placeholder={placeholder}
            _actionSheetContent={{
              backgroundColor: 'rgba(26, 32, 44, 1)',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              paddingBottom: 20,
            }}
            onValueChange={itemValue => console.log(itemValue)}>
            <Select.Item
              label="UX Research"
              value="ux"
              backgroundColor="transparent"
              _text={{
                color: 'white',
              }}
            />
            <Select.Item
              label="Cross Platform Development"
              value="cross"
              backgroundColor="transparent"
              _text={{
                color: 'white',
              }}
            />
            <Select.Item
              label="Backend Development"
              value="backend"
              backgroundColor="transparent"
              _text={{
                color: 'white',
              }}
            />
          </Select>
        ) : null}

        {rightText ? (
          <Text color="white" fontSize="md" ml="auto" mr="2">
            {rightText}
          </Text>
        ) : null}

        {rightIcon ? (
          <Image source={rightIcon} alt="icon date" ml="auto" mr="2" w="6" h="6" />
        ) : null}
      </HStack>
    </VStack>
  );
};

export default MyInput;
