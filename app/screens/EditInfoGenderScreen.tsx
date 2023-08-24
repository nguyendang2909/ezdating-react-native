import { useNavigation } from '@react-navigation/native';
import { HeaderSave } from 'app/components/Header/HeaderSave';
import { UserGender, UserGenders } from 'app/constants';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { useFormik } from 'formik';
import { Radio, useToast, View } from 'native-base';
import React from 'react';
import * as Yup from 'yup';

export const EditInforGenderScreen = () => {
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
      gender: Yup.number().required(
        translate('Please enter your w!', { w: translate('gender') }),
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

  const handleChange = (value: string) => {
    formik.setFieldValue('gender', +value);
  };

  return (
    <>
      <HeaderSave
        titleTx="Gender"
        onSave={() => formik.handleSubmit()}
        isLoading={formik.isSubmitting}
      />

      <View mt={4} mb={4} px={4}>
        <Radio.Group
          name="gender"
          value={formik.values.gender?.toString()}
          onChange={handleChange}
        >
          <Radio value={UserGenders.male.toString()} my={1}>
            {translate('Male')}
          </Radio>
          <Radio value={UserGenders.female.toString()}>
            {translate('Female')}
          </Radio>
        </Radio.Group>
      </View>
    </>
  );
};
