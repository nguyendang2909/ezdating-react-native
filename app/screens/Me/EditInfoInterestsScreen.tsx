import { useNavigation } from '@react-navigation/native';
import { useUpdateProfileMutation } from 'app/api';
import { HeaderSave } from 'app/components/Header/HeaderSave';
import { useAppSelector, useMessages } from 'app/hooks';
import { useFormik } from 'formik';
import { useToast, View } from 'native-base';
import React from 'react';
import * as Yup from 'yup';

export const EditInfoInterestScreen = () => {
  const { formatMessage } = useMessages();
  const { goBack } = useNavigation();
  const toast = useToast();
  const [updateProfile] = useUpdateProfileMutation();

  const value = useAppSelector(state => state.app.profile?.weight);

  const formik = useFormik<{ weight: number }>({
    enableReinitialize: true,
    initialValues: {
      weight: value || 50,
    },
    validationSchema: Yup.object().shape({
      weight: Yup.number().required(formatMessage('Please enter your weight.')),
    }),

    onSubmit: async values => {
      try {
        await updateProfile(values).unwrap();
      } catch (err) {
        toast.show({
          title: formatMessage('Update failed, please try again.'),
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
          label={formatMessage('Gender')}
          value={formik.values.gender}
          onChange={formik.handleChange('nickname')}
          placeholder={formatMessage('Please enter your w', {
            w: t('nickname'),
          })}
          error={formik.errors.gender}
        /> */}
      </View>
    </>
  );
};
