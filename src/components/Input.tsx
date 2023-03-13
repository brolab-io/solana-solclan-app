import { HStack, Image, Input, Text, TextArea, VStack, Select, Pressable } from 'native-base';
import React, { useCallback } from 'react';
import { ImageSourcePropType, KeyboardTypeOptions, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

type InputValueType = string | Date;
type Props<T extends InputValueType> = {
  type?: 'select' | 'input' | 'date';
  title: string;
  value: T;
  placeholder: string;
  isMultiLine?: boolean;
  keyboardType?: KeyboardTypeOptions;
  rightText?: string;
  rightIcon?: ImageSourcePropType;
  selectData?: {
    label: string;
    value: string;
  }[];
  onChange: (value: T) => void;
};
const MyInput = <T extends InputValueType>({
  type = 'input',
  title,
  value,
  placeholder,
  isMultiLine = false,
  keyboardType = 'default',
  rightText,
  rightIcon,
  selectData,
  onChange,
}: Props<T>) => {
  const [isShow, setIsShow] = React.useState(false);

  const handleChange = useCallback((v: string) => onChange(v as unknown as T), [onChange]);

  const onDatePress = useCallback(() => {
    if (type === 'date') {
      if (Platform.OS === 'ios') {
        setIsShow(true);
      } else {
        DateTimePickerAndroid.open({
          value: new Date(),
          mode: 'date',
          is24Hour: true,
          onChange: (_, date) => {
            if (date) {
              handleChange(date as unknown as any);
            }
          },
        });
      }
    }
  }, [handleChange, type]);

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
        {type === 'input' || type === 'date' ? (
          !isMultiLine ? (
            <Input
              keyboardType={keyboardType}
              w="85%"
              borderWidth={0}
              color="white"
              fontSize="md"
              backgroundColor="transparent"
              placeholder={placeholder}
              isDisabled={type === 'date'}
              value={value.toString()}
              onChangeText={handleChange}
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
              value={value.toString()}
              onChangeText={handleChange}
            />
          )
        ) : null}

        {type === 'select' ? (
          <Select
            borderWidth={0}
            w="100%"
            selectedValue={value.toString()}
            minWidth="100%"
            backgroundColor="transparent"
            accessibilityLabel="Choose Service"
            placeholder={placeholder}
            fontSize="md"
            color="white"
            _actionSheetContent={{
              backgroundColor: 'rgba(26, 32, 44, 1)',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              paddingBottom: 20,
            }}
            onValueChange={handleChange}>
            {selectData?.map(item => {
              return (
                <Select.Item
                  label={item.label}
                  value={item.value}
                  backgroundColor="transparent"
                  _text={{
                    color: 'white',
                  }}
                />
              );
            })}
          </Select>
        ) : null}

        {rightText ? (
          <Text color="white" fontSize="md" ml="auto" mr="2">
            {rightText}
          </Text>
        ) : null}

        {rightIcon ? (
          <Pressable onPress={onDatePress} ml="auto" mr="2">
            <Image source={rightIcon} alt="icon date" w="6" h="6" />
          </Pressable>
        ) : null}
      </HStack>
      {isShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value as unknown as Date}
          mode="date"
          is24Hour={true}
          onChange={(_, date) => {
            if (date) {
              handleChange(date as unknown as any);
            }
          }}
        />
      )}
    </VStack>
  );
};

export default MyInput;
