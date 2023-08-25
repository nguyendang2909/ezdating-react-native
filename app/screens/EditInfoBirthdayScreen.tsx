import { useNavigation } from '@react-navigation/native';
import { FormControlInput } from 'app/components/Form/FormControlInput';
import { HeaderSave } from 'app/components/Header/HeaderSave';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { useFormik } from 'formik';
import { View } from 'native-base';
import React from 'react';
import * as Yup from 'yup';

export const EditInfoBirthdayScreen = () => {
  const { goBack } = useNavigation();

  const value = useAppSelector(state => state.app.profile.birthday);

  const [submitUpdateProfile] = api.useUpdateProfileMutation();

  const formik = useFormik<{ birthday: string }>({
    enableReinitialize: true,
    initialValues: {
      birthday: value || '',
    },
    validationSchema: Yup.object().shape({
      birthday: Yup.string().required(
        translate('Please enter your w!', { w: translate('birthday') }),
      ),
    }),

    onSubmit: async values => {
      try {
        await submitUpdateProfile(values).unwrap();

        goBack();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <HeaderSave
        titleTx="Birthday"
        onSave={() => formik.handleSubmit()}
        isLoading={formik.isSubmitting}
      />

      <View mb="4" px={4}>
        <FormControlInput
          label={translate('Birthday')}
          value={formik.values.birthday}
          onChange={formik.handleChange('birthday')}
          placeholder={translate('Please enter your w', {
            w: translate('nickname'),
          })}
          error={formik.errors.birthday}
        />
      </View>
    </>
  );
};
