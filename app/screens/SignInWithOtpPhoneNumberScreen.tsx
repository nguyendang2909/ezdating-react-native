import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { OtpInput } from 'app/components/Input/OtpInput';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { authApi } from 'app/services/api/auth.api';
import {
  flexGrow,
  heightFull,
  marginLeft,
  marginTop,
  paddingHorizontal,
  paddingVertical,
  posititionAbsolute,
} from 'app/styles';
import { spacing } from 'app/theme';
import { ValueOf } from 'app/types/common.type';
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Link,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import React, { FC, useState } from 'react';
import { Keyboard, Pressable, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { AppStackScreenProps } from '../navigators';

type FCProps = AppStackScreenProps<'SignInWithOtpPhoneNumber'>;

const ResendStatusObj = {
  resent: 'sent',
  resending: 'resending',
  nonResent: 'nonResent',
} as const;

type ResendStatus = ValueOf<typeof ResendStatusObj>;

const maximumCodeLength = 6;

export const SignInWithOtpPhoneNumberScreen: FC<FCProps> = props => {
  const { goBack } = useNavigation();
  const { otpConfirm, user } = props.route.params;

  const [submitSignInPhoneNumber] = api.useSignInWithPhoneNumberMutation();
  const [isSubmiting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [otpCode, setOTPCode] = useState('');
  const [resendStatus, setResendStatus] = useState<ResendStatus>(
    ResendStatusObj.nonResent,
  );
  const [otpConfirmation, setOtpConfirmation] = useState<
    FirebaseAuthTypes.ConfirmationResult | undefined
  >(otpConfirm);

  if (!otpConfirm) {
    goBack();
    return <></>;
  }

  const handleSignUp = async () => {
    setError(false);
    setIsSubmitting(true);
    if (!otpConfirmation) {
      goBack();
      return;
    }
    try {
      const credential = await otpConfirmation.confirm(otpCode);
      if (!credential) {
        return;
      }
      const idToken = await credential.user.getIdToken();
      await authApi.signInWithPhoneNumber({ token: idToken });
    } catch (err) {
      console.log(err);
      setError(true);
      setResendStatus(ResendStatusObj.nonResent);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendingOtpCode = async () => {
    if (resendStatus === ResendStatusObj.resending) {
      return;
    }
    if (!user?.phoneNumber) {
      goBack();
      return;
    }
    setResendStatus(ResendStatusObj.resending);
    try {
      const confirmation = await auth().signInWithPhoneNumber(user.phoneNumber);
      setOtpConfirmation(confirmation);
    } catch (err) {}
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
            <View>
              <Heading size="2xl">{translate('Enter your code')}</Heading>
            </View>
            <View style={marginTop(spacing.md)}>
              <HStack>
                <Text fontWeight={600}>{user.phoneNumber}</Text>
                <Link
                  onPress={handleResendingOtpCode}
                  style={marginLeft(spacing.sm)}
                >
                  {translate('Resend')}
                </Link>
              </HStack>
            </View>
          </View>

          <Box
            style={[
              flexGrow,
              paddingHorizontal(spacing.lg),
              marginTop(spacing.lg),
            ]}
          >
            <HStack space="2" style={paddingVertical(spacing.lg)}>
              <FormControl isInvalid={isError}>
                <OtpInput
                  code={otpCode}
                  setCode={setOTPCode}
                  maximumLength={maximumCodeLength}
                />
                <View>
                  <FormControl.ErrorMessage
                    textAlign="center"
                    style={posititionAbsolute}
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {isError &&
                      translate('Wrong verification code, try again!')}
                  </FormControl.ErrorMessage>
                </View>
              </FormControl>
            </HStack>

            <View style={paddingVertical(spacing.xl)}>
              <Button
                isDisabled={otpCode.length !== 6}
                isLoading={isSubmiting}
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
