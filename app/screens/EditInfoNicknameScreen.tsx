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

export const EditInfoNicknameScreen = () => {
  const { goBack } = useNavigation();

  const toast = useToast();

  const currentNickname = useAppSelector(state => state.app.profile.nickname);

  const [submitUpdateProfile] = api.useUpdateProfileMutation();

  const formik = useFormik<{ nickname: string }>({
    enableReinitialize: true,
    initialValues: {
      nickname: currentNickname || '',
    },
    validationSchema: Yup.object().shape({
      nickname: Yup.string().required(
        translate('Please enter your w!', { w: translate('nickname') }),
      ),
    }),

    onSubmit: async values => {
      try {
        await submitUpdateProfile(values).unwrap();
      } catch (err) {
        toast.show({ title: 'Update nickname failed', placement: 'top' });
      }

      goBack();
    },
  });

  return (
    <>
      <HeaderSave
        titleTx="Nickname"
        onSave={() => formik.handleSubmit()}
        isLoading={formik.isSubmitting}
      />

      <View mt={4} mb={4} px={4}>
        <FormControlInput
          label={translate('Nickname')}
          value={formik.values.nickname}
          onChange={formik.handleChange('nickname')}
          placeholder={translate('Please enter your w', {
            w: translate('nickname'),
          })}
          error={formik.errors.nickname}
        />
      </View>
    </>
  );
};
