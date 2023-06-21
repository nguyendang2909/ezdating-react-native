import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { translate, TxKeyPath } from 'app/i18n';
import {
  flexDirectionRow,
  flexGrow,
  marginBottom,
  marginTop,
  posititionAbsolute,
  width,
  widthFull,
} from 'app/styles';
import { spacing } from 'app/theme';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import { isValidPhoneNumber } from 'libphonenumber-js/max';
import {
  Button,
  FormControl,
  HStack,
  Icon,
  Input,
  View,
  WarningOutlineIcon,
} from 'native-base';
import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import CountryPicker, {
  Country,
  CountryCode,
} from 'react-native-country-picker-modal';
import FeatherIcons from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';

export const SignInWithPhoneNumberForm: FC = () => {
  const { navigate } = useNavigation();
  const [isOpenSearchCountry, setOpenSearchCountry] = useState<boolean>(false);
  const [countryCode, setCountryCode] = useState<CountryCode>('VN');
  const [errorCode, setErrorCode] = useState<TxKeyPath | undefined>();

  function onAuthStateChanged(user: unknown) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  const formik = useFormik<FormParams.SignInWithPhoneNumber>({
    initialValues: {
      dialCode: '+84',
      countryCode: 'VN',
      phoneNumber: '',
    },
    validationSchema: Yup.object().shape({
      dialCode: Yup.string().required(),
      phoneNumber: Yup.string().required(),
    }),
    onSubmit: async values => {
      setErrorCode(undefined);
      try {
        const { phoneNumber, dialCode, countryCode } = values;
        const fullPhoneNumber = `${dialCode}${phoneNumber}`.replaceAll(' ', '');
        if (!isValidPhoneNumber(fullPhoneNumber, countryCode)) {
          setErrorCode('Please enter a valid phone number!');
          return;
        }
        const confirmation = await auth().signInWithPhoneNumber(
          fullPhoneNumber,
        );
        navigate('SignInWithOtpPhoneNumber', {
          otpConfirm: confirmation,
          user: { phoneNumber: fullPhoneNumber },
        });
      } catch (err) {
        setErrorCode('Error, please try again!');
      }
    },
  });

  const handlePressSubmit = () => {
    formik.handleSubmit();
  };

  const handleCloseSearchCountry = () => {
    setOpenSearchCountry(false);
  };

  const handleOpenSearchCountry = () => {
    setOpenSearchCountry(true);
  };

  const handleSelectCountry = (country: Country) => {
    formik.setFieldValue('dialCode', `+${country.callingCode[0]}`);
    formik.setFieldValue('countryCode', country.cca2);
    setCountryCode(country.cca2);
  };

  return (
    <>
      <View>
        <View style={marginBottom(spacing.lg)}>
          <View style={widthFull}>
            <FormControl
              style={widthFull}
              isRequired
              isInvalid={!!errorCode || !!formik.errors.phoneNumber}
            >
              <FormControl.Label>{translate('Phone number')}</FormControl.Label>
              <HStack space={4} style={[flexDirectionRow, widthFull]}>
                <View style={width(120)}>
                  <TouchableOpacity onPress={handleOpenSearchCountry}>
                    <Input
                      height={12}
                      size="xl"
                      testID="dialCode"
                      variant="underlined"
                      isReadOnly
                      value={formik.values.dialCode}
                      onPressIn={handleOpenSearchCountry}
                      InputLeftElement={
                        <CountryPicker
                          onClose={handleCloseSearchCountry}
                          visible={isOpenSearchCountry}
                          countryCode={countryCode}
                          withFilter
                          withCallingCode
                          withFlag={true}
                          onSelect={handleSelectCountry}
                        />
                      }
                      InputRightElement={
                        <Icon
                          as={<FeatherIcons name="chevron-down" />}
                          size={5}
                          ml="2"
                          color="muted.400"
                        />
                      }
                    ></Input>
                  </TouchableOpacity>
                </View>

                <View style={flexGrow}>
                  <Input
                    height={12}
                    size="xl"
                    testID="phoneNumber"
                    variant="underlined"
                    onChangeText={formik.handleChange('phoneNumber')}
                    placeholder={translate('Phone number')}
                    onBlur={formik.handleBlur('phoneNumber')}
                    autoFocus
                  ></Input>
                </View>
              </HStack>

              <View>
                <FormControl.ErrorMessage
                  style={posititionAbsolute}
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  {(!!errorCode && translate(errorCode)) ||
                    formik.errors.phoneNumber}
                </FormControl.ErrorMessage>
              </View>
            </FormControl>
          </View>
        </View>

        <View style={marginTop(spacing.lg)}>
          <Button onPress={handlePressSubmit} isLoading={formik.isSubmitting}>
            {translate('Next')}
          </Button>
        </View>
      </View>
    </>
  );
};
