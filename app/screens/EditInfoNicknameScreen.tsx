import { useNavigation } from '@react-navigation/native';
import { FormControlInput } from 'app/components/Form/FormControlInput';
import { HeaderSaveModal } from 'app/components/Header/HeaderSaveModal';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { usersApi } from 'app/services/api/users.api';
import { appActions } from 'app/store/app.store';
import { useFormik } from 'formik';
import { Box, useToast, View } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

export const EditInfoNicknameScreen = () => {
  const dispatch = useDispatch();

  const { goBack } = useNavigation();

  const toast = useToast();

  const currentNickname = useAppSelector(state => state.app.profile?.nickname);

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
        await usersApi.updateProfile(values);

        const profile = await usersApi.getMyProfile();

        if (profile.data) {
          dispatch(appActions.updateProfile(profile.data));
        }
      } catch (err) {
        toast.show({ title: 'Update nickname failed', placement: 'top' });
      }

      goBack();
    },
  });

  return (
    <Box flex="1" safeAreaY>
      <HeaderSaveModal
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
    </Box>
  );
};
