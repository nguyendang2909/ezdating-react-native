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
import React, { FC, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';

export type FCProps = {
  code: string;
  setCode: (c: string) => void;
  maximumLength?: number;
};

export const OtpInput: FC<FCProps> = ({ code, setCode, maximumLength = 6 }) => {
  const inputRef = useRef<any>();
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);
  const boxArray = new Array(maximumLength).fill(0);
  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    (inputRef as any).current.focus();
  };
  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };
  const boxDigit = (_: number, index: number) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;
    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;
    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);
    const StyledSplitBoxes =
      isInputBoxFocused && isValueFocused ? SplitBoxesFocused : SplitBoxes;

    return (
      <StyledSplitBoxes key={index}>
        <Text style={[fontSize(20), textAlignCenter]}>{digit}</Text>
      </StyledSplitBoxes>
    );
  };

  const handleChangeText = (text: string) => {
    setCode(text.replace(/[^0-9]/g, ''));
  };

  return (
    <View style={[alignItemsCenter, justifyContentCenter]}>
      <Pressable
        style={[flexDirectionRow, justifyContentSpaceEvenly, widthFull]}
        onPress={handleOnPress}
      >
        {boxArray.map(boxDigit)}
      </Pressable>
      <TextInput
        focusable={true}
        style={[posititionAbsolute, opacity(0)]}
        keyboardType="numeric"
        value={code}
        onChangeText={handleChangeText}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
      />
    </View>
  );
};

export const SplitBoxes = styled(View)(() => ({
  borderColor: colors.primary,
  borderWidth: 2,
  borderRadius: 5,
  padding: 8,
  minWidth: 40,
  maxWidth: 40,
  minHeight: 40,
  maxHeight: 40,
  justifyContent: 'center',
  alignItems: 'center',
}));

export const SplitBoxesFocused = styled(SplitBoxes)`
  border-color: #ecdbba;
  background-color: grey;
`;
