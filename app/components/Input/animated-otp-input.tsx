import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  Pressable,
  type StyleProp,
  StyleSheet,
  TextInput,
  type TextInputProps,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export interface IOtpInput extends TextInputProps {
  /**
   * Digits of pins in the OTP
   */
  otpCount: number;
  /**
   * Style of the input container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Style of the input fields
   */
  inputStyle?: StyleProp<TextStyle>;
  /**
   * Style of text for input fields
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Color of border color when focused
   */
  focusColor?: string;
  /**
   * If keyboard is automatically brought up when OTP is loaded.
   */
  autoFocus?: boolean;
  /**
   * Set editable for inputs
   */
  editable?: boolean;
  /**
   * Callback function
   * Trigger when all text input fields are fulfill
   */
  onCodeFilled?: (code: number) => void;
  /**
   * Callback function
   * Trigger when a field of the OTP is changed
   */
  onCodeChanged?: (codes: number) => void;
  /**
   * Entering animation using reanimated layout
   */
  enteringAnimated?: typeof LinearTransition;
  /**
   * Exiting animation using reanimated layout
   */
  exitingAnimated?: typeof LinearTransition;
}

export interface IOtpContext extends IOtpInput {
  inputRef: React.MutableRefObject<any[]>;
  otpValue: string[];
  onPress: () => void;
  onFocusNext: (value: string, index: number) => void;
  onFocusPrevious: (key: string, index: number) => void;
  setFocus: React.Dispatch<React.SetStateAction<number>>;
  setOtpValue: React.Dispatch<React.SetStateAction<string[]>>;
  focus: number;
  autoFocus: boolean;
  currentIndex: number;
  rest?: TextInputProps;
}

const { width } = Dimensions.get('window');

const OtpContext = createContext<IOtpContext>({} as IOtpContext);

const OtpItem = ({ i }: { i: number }) => {
  const {
    inputRef,
    onPress,
    otpValue,
    onFocusNext,
    onFocusPrevious,
    setFocus,
    setOtpValue,
    focus,
    focusColor,
    autoFocus,
    containerStyle,
    inputStyle,
    textStyle,
    otpCount,
    editable,
    enteringAnimated,
    exitingAnimated,
    rest,
  } = useContext(OtpContext);

  const border = useSharedValue(focus === i ? 1.5 : 0);

  const borderStyle = useAnimatedStyle(() => {
    return {
      borderWidth: border.value,
    };
  }, []);

  useEffect(() => {
    border.value = withDelay(50, withTiming(focus === i ? 1.5 : 0, { duration: 100 }));
  }, [focus]);

  useEffect(() => {
    if (otpValue) {
      if ((otpValue[i]?.length ?? 0) > 1) {
        const format = otpValue[i]?.substring(0, otpCount);
        const numbers = format?.split('') ?? [];
        setOtpValue(numbers);
        setFocus(-1);
        Keyboard.dismiss();
      }
    }
  }, [otpValue]);

  return (
    <View key={i} style={containerStyle}>
      <TextInput
        style={[styles.inputSize, inputStyle]}
        caretHidden
        keyboardType="number-pad"
        ref={inputRef.current[i]}
        value={otpValue[i]}
        onChangeText={v => onFocusNext(v, i)}
        onKeyPress={e => onFocusPrevious(e.nativeEvent.key, i)}
        textContentType="oneTimeCode"
        autoFocus={autoFocus && i === 0}
        {...rest}
      />
      <Pressable disabled={!editable} onPress={onPress} style={styles.overlay}>
        <Animated.View
          style={[
            {
              borderColor: focusColor,
            },
            styles.inputSize,
            styles.input,
            borderStyle,
            inputStyle,
          ]}
        >
          {otpValue[i] !== '' && (
            <Animated.Text
              entering={enteringAnimated}
              exiting={exitingAnimated}
              style={[styles.text, textStyle]}
            >
              {otpValue[i]}
            </Animated.Text>
          )}
        </Animated.View>
      </Pressable>
    </View>
  );
};

export const AnimatedOtpInput = ({
  otpCount = 6,
  containerStyle = {},
  inputStyle = {},
  textStyle = {},
  focusColor = '#4497ce',
  autoFocus = false,
  editable = true,
  enteringAnimated = FadeInDown,
  exitingAnimated = FadeOut,
  onCodeFilled,
  onCodeChanged,
  ...rest
}: IOtpInput) => {
  const inputRef = useRef<any[]>([]);
  const data: string[] = new Array(otpCount).fill('');
  inputRef.current = data.map(
    (_, index) => (inputRef.current[index] = React.createRef<TextInput>()),
  );
  const [focus, setFocus] = useState<number>(0);
  const [otpValue, setOtpValue] = useState<string[]>(data);

  const onPress = () => {
    if (focus === -1) {
      setFocus(otpCount - 1);
      otpValue[data.length - 1] = '';
      setOtpValue([...otpValue]);
      inputRef.current[data.length - 1].current.focus();
    } else {
      inputRef.current[focus].current.focus();
    }
  };

  const onFocusNext = (value: string, index: number) => {
    if (index < data.length - 1 && value) {
      inputRef.current[index + 1].current.focus();
      setFocus(index + 1);
    }
    if (index === data.length - 1) {
      setFocus(-1);
      inputRef.current[index].current.blur();
    }
    otpValue[index] = value;
    setOtpValue([...otpValue]);
  };

  const onFocusPrevious = (key: string, index: number) => {
    if (key === 'Backspace' && index !== 0) {
      inputRef.current[index - 1].current.focus();
      setFocus(index - 1);
      otpValue[index - 1] = '';
      setOtpValue([...otpValue]);
    } else if (key === 'Backspace' && index === 0) {
      otpValue[0] = '';
    }
  };
  if (otpCount < 4 && otpCount > 6) {
    throw 'OTP Count min is 4 and max is 6';
  }
  const inputProps = {
    inputRef,
    otpValue,
    onPress,
    onFocusNext,
    onFocusPrevious,
    setFocus,
    setOtpValue,
    focus,
    autoFocus,
    containerStyle,
    inputStyle,
    textStyle,
    focusColor,
    otpCount,
    editable,
    enteringAnimated,
    exitingAnimated,
    rest,
  };

  useEffect(() => {
    onCodeChanged && onCodeChanged(Number(otpValue.join('')));
    if (otpValue && Number(otpValue.join('').length === otpCount) && onCodeFilled) {
      onCodeFilled(Number(otpValue.join('')));
    }
  }, [otpValue]);

  return (
    <OtpContext.Provider value={inputProps as IOtpContext}>
      <View style={[styles.rowCenter, styles.container]}>
        {data.map((_, i) => {
          return <OtpItem key={i} i={i} />;
        })}
      </View>
    </OtpContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width,
  },
  input: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 3,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.09,
    shadowRadius: 10,
  },
  inputSize: {
    height: 60,
    marginHorizontal: 8,
    width: 45,
  },
  overlay: {
    position: 'absolute',
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: '#2b4156',
    fontSize: 26,
    fontWeight: '600',
  },
});
