import { useNavigation } from '@react-navigation/native';
import { Header } from 'app/components';
import { UserGender } from 'app/constants';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { useFormik } from 'formik';
import { Button, useToast, View } from 'native-base';
import React from 'react';
import * as Yup from 'yup';

export const EditWeightScreen = () => {
  const { goBack } = useNavigation();

  const toast = useToast();

  const currentGender = useAppSelector(state => state.app.profile.gender);

  const [submitUpdateProfile] = api.useUpdateProfileMutation();

  const formik = useFormik<{ gender?: UserGender }>({
    enableReinitialize: true,
    initialValues: {
      gender: currentGender,
    },
    validationSchema: Yup.object().shape({
      gender: Yup.string().required(
        translate('Please enter your w!', { w: translate('gender') }),
      ),
    }),

    onSubmit: async values => {
      try {
        await submitUpdateProfile(values);
      } catch (err) {
        toast.show({
          title: translate('Update w failed!', { w: translate('gender') }),
          placement: 'top',
        });
      }

      goBack();
    },
  });

  return (
    <>
      <Header
        titleTx="Nickname"
        leftIcon="caretLeft"
        onLeftPress={goBack}
        RightActionComponent={
          <Button
            variant="unstyled"
            onPress={() => formik.handleSubmit()}
            isLoading={formik.isSubmitting}
          >
            {translate('Save')}
          </Button>
        }
      />

      <View mt={4} mb={4} px={4}>
        {/* <FormControlInput
          label={translate('Gender')}
          value={formik.values.gender}
          onChange={formik.handleChange('nickname')}
          placeholder={translate('Please enter your w', {
            w: translate('nickname'),
          })}
          error={formik.errors.gender}
        /> */}
      </View>
    </>
  );
};
