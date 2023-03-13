import { HStack, Image, Input, Text, TextArea, VStack, Select, Pressable } from 'native-base';
import React, { useCallback } from 'react';
import { ImageSourcePropType, KeyboardTypeOptions, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

type Props = {
  type?: 'select' | 'input' | 'date';
  title: string;
  value: string | Date;
  placeholder: string;
  isMultiLine?: boolean;
  keyboardType?: KeyboardTypeOptions;
  rightText?: string;
  rightIcon?: ImageSourcePropType;
  selectData?: {
    label: string;
    value: string;
  }[];
  onChange: (value: string | Date) => void;
};
const MyInput: React.FC<Props> = ({
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
}) => {
  const [isShow, setIsShow] = React.useState(false);

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
              onChange(date);
            }
          },
        });
      }
    }
  }, [onChange, type]);

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
              onChangeText={onChange}
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
              onChangeText={onChange}
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
            onValueChange={onChange}>
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
          value={new Date()}
          mode="date"
          is24Hour={true}
          onChange={(_, date) => {
            if (date) {
              onChange(date);
            }
          }}
        />
      )}
    </VStack>
  );
};

export default MyInput;
