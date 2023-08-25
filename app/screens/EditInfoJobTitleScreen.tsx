import { useNavigation } from '@react-navigation/native';
import { FormControlInput } from 'app/components/Form/FormControlInput';
import { HeaderSave } from 'app/components/Header/HeaderSave';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { useFormik } from 'formik';
import { useToast, View } from 'native-base';
import React from 'react';
import * as Yup from 'yup';

export const EditInfoJobTitleScreen = () => {
  const { goBack } = useNavigation();

  const toast = useToast();

  const value = useAppSelector(state => state.app.profile.jobTitle);

  const [submitUpdateProfile] = api.useUpdateProfileMutation();

  const formik = useFormik<{ jobTitle: string }>({
    enableReinitialize: true,
    initialValues: {
      jobTitle: value || '',
    },
    validationSchema: Yup.object().shape({
      value: Yup.string().required(
        translate('Please enter your w!', { w: translate('job title') }),
      ),
    }),
    onSubmit: async values => {
      try {
        await submitUpdateProfile(values);
      } catch (err) {
        toast.show({
          title: translate('Update w failed!', { w: translate('job title') }),
          placement: 'top',
        });
      }

      goBack();
    },
  });

  return (
    <>
      <HeaderSave
        titleTx="Job title"
        onSave={() => formik.handleSubmit()}
        isLoading={formik.isSubmitting}
      />

      <View mt={4} mb={4} px={4}>
        <FormControlInput
          label={translate('Job title')}
          value={formik.values.jobTitle}
          onChange={formik.handleChange('jobTitle')}
          placeholder={translate('Please enter your w', {
            w: translate('job title'),
          })}
          error={formik.errors.jobTitle}
        />
      </View>
    </>
  );
};
