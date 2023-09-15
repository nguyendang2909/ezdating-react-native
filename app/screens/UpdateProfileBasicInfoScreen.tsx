import { useNavigation } from '@react-navigation/native';
import { BirthDayFormControl } from 'app/components/Form/BirthDayFormControl';
import { FormControlInput } from 'app/components/Form/FormControlInput';
import { RelationshipGoalFormControl } from 'app/components/Form/RelationshipGoalFormControl';
import { SelectGenderFormControl } from 'app/components/Form/SelectGenderForm';
import { UserGender, UserRelationshipGoal } from 'app/constants';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { usersApi } from 'app/services/api/users.api';
import { flexGrow } from 'app/styles';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import moment from 'moment';
import { Box, Button, Heading, ScrollView, View } from 'native-base';
import React, { FC } from 'react';
import * as Yup from 'yup';

export const UpdateProfileBasicInfoScreen: FC = () => {
  const profile = useAppSelector(state => state.app.profile);
  const { navigate } = useNavigation();
  const [submitUpdateBasicProfile] = api.useUpdateBasicProfileMutation();
  const formik = useFormik<FormParams.BasicInfo>({
    initialValues: {
      nickname: profile?.nickname,
      gender: profile?.gender,
      birthday: profile?.birthday
        ? moment(profile?.birthday).format('YYYY-MM-DD')
        : undefined,
      relationshipGoal: profile?.relationshipGoal,
      introduce: profile?.introduce,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      nickname: Yup.string().required(
        translate('Please enter your w!', { w: translate('nickname') }),
      ),
      gender: Yup.number().required(
        translate('Please choose your w!', { w: translate('gender') }),
      ),
      birthday: Yup.string().required(
        translate('Please enter your w!', { w: translate('birthday') }),
      ),
      relationshipGoal: Yup.string().required(
        translate('Please choose your w!', { w: translate('desire relation') }),
      ),
      introduce: Yup.string().max(500).notRequired(),
    }),
    onSubmit: async values => {
      try {
        await usersApi.updateBasicProfile(values);
        navigate('UpdateProfilePhotosScreen');
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleChangeGender = (value: UserGender) => {
    formik.setFieldValue('gender', value);
  };

  const handleChangeRelationshipGoal = (value: UserRelationshipGoal) => {
    formik.setFieldValue('relationshipGoal', value);
  };

  return (
    <>
      <Box flex="1" safeAreaY>
        <View flex="1">
          <View flex="1">
            <ScrollView style={flexGrow}>
              <View px="4" py="4">
                <Heading>{translate('Your profile')}</Heading>
              </View>

              <View px="4">
                <View mb="4">
                  <FormControlInput
                    isRequired
                    label={translate('Nickname')}
                    value={formik.values.nickname}
                    onChange={formik.handleChange('nickname')}
                    placeholder={translate('Please enter your w', {
                      w: translate('nickname'),
                    })}
                    error={
                      formik.touched.nickname
                        ? formik.errors.nickname
                        : undefined
                    }
                  />
                </View>

                <View mb="4">
                  <SelectGenderFormControl
                    isRequired
                    value={formik.values.gender}
                    onChange={handleChangeGender}
                    error={
                      formik.touched.gender ? formik.errors.gender : undefined
                    }
                  />
                </View>

                <View mb="4">
                  <BirthDayFormControl
                    isRequired
                    value={formik.values.birthday}
                    onChange={formik.handleChange('birthday')}
                    error={
                      formik.touched.birthday
                        ? formik.errors.birthday
                        : undefined
                    }
                  />
                </View>

                <View mb="4">
                  <RelationshipGoalFormControl
                    isRequired
                    value={formik.values.relationshipGoal}
                    onChange={handleChangeRelationshipGoal}
                    error={
                      formik.touched.relationshipGoal
                        ? formik.errors.relationshipGoal
                        : undefined
                    }
                  />
                </View>

                <View mb="4">
                  <FormControlInput
                    label={translate('Introduce')}
                    value={formik.values.introduce}
                    onChange={formik.handleChange('introduce')}
                    placeholder={translate('Please enter your w', {
                      w: translate('introduce'),
                    })}
                    maxLength={500}
                    error={
                      formik.touched.introduce
                        ? formik.errors.introduce
                        : undefined
                    }
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
                {translate('Continue')}
              </Button>
            </View>
          </View>
        </View>
      </Box>
    </>
  );
};
