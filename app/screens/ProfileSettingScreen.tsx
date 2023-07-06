import { useNavigation } from '@react-navigation/native';
import { LogoutButton } from 'app/containers/Button/LogoutButton';
import { ProfileSettingHeader } from 'app/containers/ProfileSetting/ProfileSettingHeader';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import moment from 'moment';
import { Box, ScrollView, View } from 'native-base';
import React, { FC } from 'react';
import * as Yup from 'yup';

export const ProfileSettingScreen: FC = () => {
  const profile = useAppSelector(state => state.app.profile);
  const { navigate } = useNavigation();
  const [submitUpdateProfile] = api.useUpdateProfileMutation();
  const formik = useFormik<FormParams.BasicInfo>({
    initialValues: {
      nickname: profile?.nickname,
      gender: profile?.gender,
      birthday: profile?.birthday
        ? moment(profile?.birthday).format('YYYY-MM-DD')
        : undefined,
      lookingFor: profile?.lookingFor,
      introduce: profile?.introduce,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      nickname: Yup.string().required(
        translate('Please enter your w!', { w: translate('nickname') }),
      ),
      gender: Yup.string().required(
        translate('Please choose your w!', { w: translate('gender') }),
      ),
      birthday: Yup.string().required(
        translate('Please enter your w!', { w: translate('birthday') }),
      ),
      lookingFor: Yup.string().required(
        translate('Please choose your w!', { w: translate('desire relation') }),
      ),
      introduce: Yup.string().max(500).notRequired(),
    }),
    onSubmit: async values => {
      try {
        await submitUpdateProfile(values).unwrap();
        navigate('UpdateProfilePhotosScreen');
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <Box flex="1" safeAreaY>
        <View>
          <ProfileSettingHeader />
        </View>
        <ScrollView mt={4}>
          <View px={4}>
            <LogoutButton />
          </View>
        </ScrollView>
      </Box>
    </>
  );
};
