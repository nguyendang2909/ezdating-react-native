import { useNavigation } from '@react-navigation/native';
import { Header } from 'app/components';
import { FormControlInput } from 'app/components/Form/FormControlInput';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { useFormik } from 'formik';
import { Button, View } from 'native-base';
import React from 'react';
import * as Yup from 'yup';

export const EditNicknameScreen = () => {
  const { goBack } = useNavigation();

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
        await submitUpdateProfile(values);

        goBack();
      } catch (err) {
        console.log(err);
      }
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

      <View mb="4" px={4}>
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
