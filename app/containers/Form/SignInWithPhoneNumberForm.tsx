import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { translate, TxKeyPath } from 'app/i18n';
import { phoneRegExp } from 'app/lib/validators';
import { marginBottom, marginTop } from 'app/styles';
import { spacing } from 'app/theme';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import {
  Button,
  FormControl,
  Input,
  View,
  WarningOutlineIcon,
} from 'native-base';
import React, { FC, useEffect, useState } from 'react';
import * as Yup from 'yup';

export const SignInWithPhoneNumberForm: FC = () => {
  const { navigate } = useNavigation();

  const [errorCode, setErrorCode] = useState<TxKeyPath | undefined>();

  function onAuthStateChanged(user: unknown) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber; // unsubscribe on unmount
  }, []);

  const formik = useFormik<FormParams.SignInWithPhoneNumber>({
    initialValues: {
      phoneNumber: '',
    },
    validationSchema: Yup.object().shape({
      phoneNumber: Yup.string().matches(
        phoneRegExp,
        translate('Phone number is not valid!'),
      ),
    }),
    onSubmit: async values => {
      setErrorCode(undefined);
      try {
        const { phoneNumber } = values;
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        navigate('SignInWithOtpPhoneNumber', {
          otpConfirm: confirmation,
          user: { phoneNumber },
        });
      } catch (err) {
        setErrorCode('Error, please try again!');
      }
    },
  });

  const handlePressSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <View>
      <View style={marginBottom(spacing.lg)}>
        <FormControl
          isRequired
          isInvalid={!!errorCode || !!formik.errors.phoneNumber}
        >
          <FormControl.Label>{translate('Phone number')}</FormControl.Label>
          <Input
            size="xl"
            testID="phoneNumber"
            variant="underlined"
            onChangeText={formik.handleChange('phoneNumber')}
            placeholder={translate('Enter your phone number')}
            onBlur={formik.handleBlur('phoneNumber')}
            autoFocus
          ></Input>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {(!!errorCode && translate(errorCode)) || formik.errors.phoneNumber}
          </FormControl.ErrorMessage>
        </FormControl>
      </View>

      <View style={marginTop(spacing.lg)}>
        <Button onPress={handlePressSubmit} isLoading={formik.isSubmitting}>
          Next
        </Button>
      </View>
    </View>
  );
};
