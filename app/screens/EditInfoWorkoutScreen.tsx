import { useNavigation } from '@react-navigation/native';
import { HeaderSave } from 'app/components/Header/HeaderSave';
import { useAppSelector } from 'app/hooks';
import { useTranslate } from 'app/hooks/useFormatMessage';
import { api } from 'app/services/api';
import { useFormik } from 'formik';
import { useToast, View } from 'native-base';
import React from 'react';
import * as Yup from 'yup';

export const EditInfoWeightScreen = () => {
  const t = useTranslate();
  const { goBack } = useNavigation();

  const toast = useToast();

  const value = useAppSelector(state => state.app.profile?.weight);

  const [submitUpdateProfile] = api.useUpdateProfileMutation();

  const formik = useFormik<{ weight: number }>({
    enableReinitialize: true,
    initialValues: {
      weight: value || 50,
    },
    validationSchema: Yup.object().shape({
      weight: Yup.number().required(t('Please enter your weight.')),
    }),

    onSubmit: async values => {
      try {
        await submitUpdateProfile(values);
      } catch (err) {
        toast.show({
          title: t('Update failed, please try again.'),
          placement: 'top',
        });
      }

      goBack();
    },
  });

  return (
    <>
      <HeaderSave
        titleTx="Relationship goal"
        onSave={() => formik.handleSubmit()}
        isLoading={formik.isSubmitting}
      />

      <View mt={4} mb={4} px={4}>
        {/* <FormControlInput
          label={t('Gender')}
          value={formik.values.gender}
          onChange={formik.handleChange('nickname')}
          placeholder={t('Please enter your w', {
            w: t('nickname'),
          })}
          error={formik.errors.gender}
        /> */}
      </View>
    </>
  );
};
