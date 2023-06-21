import {
  alignItemsCenter,
  flexDirectionRow,
  fontSize,
  justifyContentCenter,
  justifyContentSpaceEvenly,
  opacity,
  posititionAbsolute,
  textAlignCenter,
  widthFull,
} from 'app/styles';
import { colors } from 'app/theme';
import { HStack } from 'native-base';
import React, { FC, useRef } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';

export type FCProps = {
  code: string;
  setCode: (c: string) => void;
  maximumLength?: number;
};

export const OtpInput: FC<FCProps> = ({ code, setCode, maximumLength = 6 }) => {
  const inputRef = useRef<any>();

  const boxArray = new Array(maximumLength).fill(0);
  const handleOnPress = () => {
    (inputRef as any).current.focus();
  };

  const handleChangeText = (text: string) => {
    setCode(text.replace(/[^0-9]/g, ''));
  };

  return (
    <View style={[alignItemsCenter, justifyContentCenter]}>
      <Pressable onPress={handleOnPress}>
        <HStack
          space={2}
          style={[flexDirectionRow, justifyContentSpaceEvenly, widthFull]}
        >
          {boxArray.map((_: number, index: number) => {
            const digit = code[index] || '';

            return (
              <SplitBoxes key={index}>
                <Text style={[fontSize(24), textAlignCenter]}>{digit}</Text>
              </SplitBoxes>
            );
          })}
        </HStack>
      </Pressable>
      <TextInput
        focusable={true}
        style={[posititionAbsolute, opacity(0)]}
        keyboardType="numeric"
        value={code}
        onChangeText={handleChangeText}
        maxLength={maximumLength}
        ref={inputRef}
      />
    </View>
  );
};

export const SplitBoxes = styled(View)(() => ({
  borderBottomColor: colors.primary,
  borderBottomWidth: 2,
  flex: 1,
  minHeight: 30,
  maxHeight: 30,
  justifyContent: 'center',
  alignItems: 'center',
}));
