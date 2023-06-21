import { useNavigation } from '@react-navigation/native';
import { OtpInput } from 'app/components/Input/OtpInput';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import {
  flexGrow,
  heightFull,
  paddingHorizontal,
  paddingVertical,
} from 'app/styles';
import { spacing } from 'app/theme';
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Text,
} from 'native-base';
import React, { FC, useState } from 'react';
import { Keyboard, Pressable, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { AppStackScreenProps } from '../navigators';

type FCProps = AppStackScreenProps<'SignInWithOtpPhoneNumber'>;

export const SignInWithOtpPhoneNumberScreen: FC<FCProps> = props => {
  const { goBack } = useNavigation();
  const maximumCodeLength = 6;
  const [submitSignInPhoneNumber] = api.useSignInWithPhoneNumberMutation();
  const [isSubmiting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [otpCode, setOTPCode] = useState('');
  const { otpConfirm, user } = props.route.params;
  if (!otpConfirm) {
    goBack();
  }
  const handleSignUp = async () => {
    setError(false);
    setIsSubmitting(true);
    try {
      const credential = await otpConfirm.confirm(otpCode);
      if (!credential) {
        return;
      }
      const idToken = await credential.user.getIdToken();
      await submitSignInPhoneNumber({
        ...user,
        token: idToken,
      }).unwrap();
    } catch (err) {
      console.log(111, err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Box style={heightFull} safeAreaY>
        <Pressable style={flexGrow} onPress={Keyboard.dismiss}>
          <View
            style={[paddingHorizontal(spacing.lg), paddingVertical(spacing.lg)]}
          >
            <View>
              <IconButton
                borderRadius="full"
                size={36}
                onPress={goBack}
                icon={<MaterialIcons name="chevron-left" size={36} />}
              ></IconButton>
            </View>
            <Heading size="2xl">{translate('Input OTP')}</Heading>
            <Text>{translate('signInWithOtpPhoneScreen.checkSmsMessage')}</Text>
          </View>

          <Box style={[flexGrow, paddingHorizontal(spacing.lg)]}>
            <HStack space="2" style={paddingVertical(spacing.lg)}>
              <FormControl isInvalid={isError}>
                <OtpInput
                  code={otpCode}
                  setCode={setOTPCode}
                  maximumLength={maximumCodeLength}
                />
                <FormControl.ErrorMessage>
                  {isError && translate('Wrong verification code, try again!')}
                </FormControl.ErrorMessage>
              </FormControl>
            </HStack>
            {/* <View>
              <Text>Resend OTP</Text>
            </View> */}
            <View style={paddingVertical(spacing.lg)}>
              <Button
                isLoading={isSubmiting}
                disabled={otpCode.length !== 6}
                testID="register-button"
                onPress={handleSignUp}
              >
                {translate('Sign in')}
              </Button>
            </View>
          </Box>
          <View>
            <Text textAlign="center">{translate('EZDating')}</Text>
          </View>
        </Pressable>
      </Box>
    </>
  );
};
