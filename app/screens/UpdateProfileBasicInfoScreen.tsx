import { useNavigation } from '@react-navigation/native';
import { BirthDayFormControl } from 'app/components/Form/BirthDayFormControl';
import { FormControlInput } from 'app/components/Form/FormControlInput';
import { LookingForFormControl } from 'app/components/Form/LookingForFormControl';
import { SelectGenderFormControl } from 'app/components/Form/SelectGenderForm';
import { LoadingScreen } from 'app/components/Screen/LoadingScreen';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { flexGrow } from 'app/styles';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import moment from 'moment';
import { Box, Button, Heading, View } from 'native-base';
import React, { FC } from 'react';
import * as Yup from 'yup';

export const UpdateProfileBasicInfoScreen: FC = () => {
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
      introduce: Yup.string().max(500).optional(),
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
        <LoadingScreen isLoading={formik.isSubmitting} />
        <View flex="1">
          <View flex="1">
            {/* TODO: ScrollView */}
            <View style={flexGrow}>
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
                    error={formik.errors.nickname}
                  />
                </View>

                <View mb="4">
                  <SelectGenderFormControl
                    isRequired
                    value={formik.values.gender}
                    onChange={formik.handleChange('gender')}
                    error={formik.errors.gender}
                  />
                </View>

                <View mb="4">
                  <BirthDayFormControl
                    isRequired
                    value={formik.values.birthday}
                    onChange={formik.handleChange('birthday')}
                    error={formik.errors.birthday}
                  />
                </View>

                <View mb="4">
                  <LookingForFormControl
                    isRequired
                    value={formik.values.lookingFor}
                    onChange={formik.handleChange('lookingFor')}
                    error={formik.errors.lookingFor}
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
                    error={formik.errors.nickname}
                    maxLength={500}
                  />
                </View>
              </View>
            </View>

            <View px="4" py="4">
              <Button
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
