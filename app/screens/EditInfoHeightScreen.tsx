import { useNavigation } from '@react-navigation/native';
import { HeaderSave } from 'app/components/Header/HeaderSave';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { useFormik } from 'formik';
import { useToast, View } from 'native-base';
import React from 'react';
import * as Yup from 'yup';

export const EditInfoHeightScreen = () => {
  const { goBack } = useNavigation();

  const toast = useToast();

  const currentHeight = useAppSelector(state => state.app.profile.height);

  const [submitUpdateProfile] = api.useUpdateProfileMutation();

  const formik = useFormik<{ height: number }>({
    enableReinitialize: true,
    initialValues: {
      height: currentHeight || 165,
    },
    validationSchema: Yup.object().shape({
      height: Yup.string().required(
        translate('Please enter your w!', { w: translate('height') }),
      ),
    }),

    onSubmit: async values => {
      try {
        await submitUpdateProfile(values).unwrap();
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
      <HeaderSave
        titleTx="Height"
        onSave={() => formik.handleSubmit()}
        isLoading={formik.isSubmitting}
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