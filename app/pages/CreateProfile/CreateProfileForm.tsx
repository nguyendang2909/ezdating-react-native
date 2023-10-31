import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useCreateProfileMutation, useGetProfileMutation } from 'app/api';
import { BirthDayFormControl } from 'app/components/Form/BirthDayFormControl';
import { FormControlInput } from 'app/components/Form/FormControlInput';
import { RelationshipGoalFormControl } from 'app/components/Form/RelationshipGoalFormControl';
import { SelectGenderFormControl } from 'app/components/Form/SelectGenderForm';
import { UserGender } from 'app/constants/constants';
import { useAppSelector, useMessages } from 'app/hooks';
import { appActions } from 'app/store/app.store';
import { flexGrow } from 'app/styles';
import { FormParams, RelationshipGoal } from 'app/types';
import { useFormik } from 'formik';
import moment from 'moment';
import { Box, Button, Heading, ScrollView, View } from 'native-base';
import React, { FC } from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

export const CreateProfileForm: FC = () => {
  const { formatMessage } = useMessages();
  const [createProfile] = useCreateProfileMutation();
  const profile = useAppSelector(state => state.app.profile);
  const navigation = useNavigation();
  const [getProfile] = useGetProfileMutation();
  const dispatch = useDispatch();

  const handleChangeGender = (value: UserGender) => {
    formik.setFieldValue('gender', value);
  };

  const handleChangeRelationshipGoal = (value: RelationshipGoal) => {
    formik.setFieldValue('relationshipGoal', value);
  };

  const formik = useFormik<FormParams.CreateProfile>({
    initialValues: {
      nickname: profile?.nickname,
      gender: profile?.gender,
      birthday: profile?.birthday ? moment(profile?.birthday).format('YYYY-MM-DD') : undefined,
      relationshipGoal: profile?.relationshipGoal,
      introduce: profile?.introduce,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      nickname: Yup.string().required(formatMessage('Please enter your nickname')),
      gender: Yup.number().required(formatMessage('Please enter your gender')),
      birthday: Yup.string().required(formatMessage('Please enter your birthday')),
      relationshipGoal: Yup.string().required(formatMessage('Please choose your desire relation.')),
      introduce: Yup.string().max(500).notRequired(),
    }),
    onSubmit: async values => {
      try {
        const { nickname, gender, birthday, relationshipGoal, introduce } = values;
        if (nickname && gender && birthday && relationshipGoal) {
          await createProfile({ nickname, gender, birthday, relationshipGoal, introduce }).unwrap();
          navigation.dispatch(StackActions.replace('UpdateProfilePhotos'));
        }
      } catch (error) {
        if ('status' in error && error.status === 409) {
          try {
            const profile = await getProfile().unwrap();
            dispatch(appActions.setProfile(profile.data));
            navigation.dispatch(StackActions.replace('UpdateProfilePhotos'));
          } catch (err) {}
        }
        Toast.show({
          text1: formatMessage('Oops, something went wrong. Please try again.'),
        });
      }
    },
  });

  return (
    <>
      <Box flex="1" safeAreaY>
        <View flex="1">
          <View flex="1">
            <ScrollView style={flexGrow}>
              <View px="4" py="4">
                <Heading>{formatMessage('Your profile')}</Heading>
              </View>

              <View px="4">
                <View mb="4">
                  <FormControlInput
                    isRequired
                    label={formatMessage('Nickname')}
                    value={formik.values.nickname}
                    onChange={formik.handleChange('nickname')}
                    placeholder={formatMessage('Please enter your nickname')}
                    error={formik.touched.nickname ? formik.errors.nickname : undefined}
                  />
                </View>

                <View mb="4">
                  <SelectGenderFormControl
                    isRequired
                    value={formik.values.gender}
                    onChange={handleChangeGender}
                    error={formik.touched.gender ? formik.errors.gender : undefined}
                  />
                </View>

                <View mb="4">
                  <BirthDayFormControl
                    isRequired
                    value={formik.values.birthday}
                    onChange={formik.handleChange('birthday')}
                    error={formik.touched.birthday ? formik.errors.birthday : undefined}
                  />
                </View>

                <View mb="4">
                  <RelationshipGoalFormControl
                    isRequired
                    value={formik.values.relationshipGoal}
                    onChange={handleChangeRelationshipGoal}
                    error={
                      formik.touched.relationshipGoal ? formik.errors.relationshipGoal : undefined
                    }
                  />
                </View>

                <View mb="4">
                  <FormControlInput
                    label={formatMessage('Introduce')}
                    value={formik.values.introduce}
                    onChange={formik.handleChange('introduce')}
                    placeholder={formatMessage('Please enter your introduce')}
                    maxLength={500}
                    error={formik.touched.introduce ? formik.errors.introduce : undefined}
                  />
                </View>
              </View>
            </ScrollView>

            <View px="4" py="4">
              <Button
                isLoading={formik.isSubmitting}
                onPress={() => {
                  formik.handleSubmit();
                }}
              >
                {formatMessage('Continue')}
              </Button>
            </View>
          </View>
        </View>
        {Platform.OS === 'android' && <KeyboardAvoidingView behavior={'padding'} />}
      </Box>
    </>
  );
};
