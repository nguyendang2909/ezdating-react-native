import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useSignInWithPhoneNumberMutation } from 'app/api';
import { OtpInput } from 'app/components/Input/OtpInput';
import { BackIconButton } from 'app/containers/IconButton/BackIconButton';
import { useMessages } from 'app/hooks';
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
  Link,
  Text,
  WarningOutlineIcon,
} from 'native-base';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Keyboard, Pressable, View } from 'react-native';

import { AppStackScreenProps } from '../../navigators';

type FCProps = AppStackScreenProps<'SignInWithOtpPhoneNumber'>;

const ResendStatusObj = {
  resent: 'sent',
  resending: 'resending',
  nonResent: 'nonResent',
} as const;

type ResendStatus = ValueOf<typeof ResendStatusObj>;

const maximumCodeLength = 6;

export const SignInWithOtpPhoneNumberScreen: FC<FCProps> = props => {
  const { formatMessage } = useMessages();
  const { goBack } = useNavigation();
  const { otpConfirm, user } = props.route.params;
  const [signInWithPhoneNumberMutation] = useSignInWithPhoneNumberMutation();

  const [isSubmiting, setIsSubmitting] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [otpCode, setOTPCode] = useState('');
  const [resendStatus, setResendStatus] = useState<ResendStatus>(ResendStatusObj.nonResent);
  const [otpConfirmation, setOtpConfirmation] = useState<
    FirebaseAuthTypes.ConfirmationResult | undefined
  >(otpConfirm);

  const signUp = useCallback(
    async (e: string) => {
      setError(false);
      setIsSubmitting(true);
      if (!otpConfirmation) {
        goBack();
        return;
      }
      try {
        const credential = await otpConfirmation.confirm(e);
        if (!credential) {
          return;
        }
        const idToken = await credential.user.getIdToken();
        await signInWithPhoneNumberMutation({
          token: idToken,
        }).unwrap();
      } catch (err) {
        setError(true);
        setResendStatus(ResendStatusObj.nonResent);
      } finally {
        setIsSubmitting(false);
      }
    },
    [goBack, otpConfirmation, signInWithPhoneNumberMutation],
  );

  useEffect(() => {
    if (!otpConfirmation) {
      goBack();
    }
  }, [goBack, otpConfirmation]);

  useEffect(() => {
    if (otpCode.length === 6) {
      signUp(otpCode);
    }
  }, [otpCode, signUp]);

  if (!otpConfirm) {
    goBack();
    return <></>;
  }

  const handleResendingOtpCode = async () => {
    if (resendStatus === ResendStatusObj.resending) {
      return;
    }
    if (!user || !user?.phoneNumber) {
      goBack();
      return;
    }
    setResendStatus(ResendStatusObj.resending);
    try {
      const confirmation = await auth().signInWithPhoneNumber(user.phoneNumber);
      setOtpConfirmation(confirmation);
    } catch (err) {}
  };

  const handleSignUp = () => {
    signUp(otpCode);
  };

  return (
    <>
      <Box style={heightFull} safeAreaY>
        <Pressable style={flexGrow} onPress={Keyboard.dismiss}>
          <View style={[paddingHorizontal(spacing.lg), paddingVertical(spacing.lg)]}>
            <View>
              <BackIconButton />
            </View>
            <View>
              <Heading size="2xl">{formatMessage('Enter your code')}</Heading>
            </View>
            <View style={marginTop(spacing.md)}>
              <HStack>
                <Text fontWeight={600}>{user?.phoneNumber}</Text>
                <Link onPress={handleResendingOtpCode} style={marginLeft(spacing.sm)}>
                  {formatMessage('Resend')}
                </Link>
              </HStack>
            </View>
          </View>

          <Box style={[flexGrow, paddingHorizontal(spacing.lg), marginTop(spacing.lg)]}>
            <HStack space="2" style={paddingVertical(spacing.lg)}>
              <FormControl isInvalid={isError}>
                <OtpInput code={otpCode} setCode={setOTPCode} maximumLength={maximumCodeLength} />
                <View>
                  <FormControl.ErrorMessage
                    textAlign="center"
                    style={posititionAbsolute}
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {isError && formatMessage('Wrong verification code, try again!')}
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
                {formatMessage('Sign in')}
              </Button>
            </View>
          </Box>
          <View>
            <Text textAlign="center">{formatMessage('AppName')}</Text>
          </View>
        </Pressable>
      </Box>
    </>
  );
};
