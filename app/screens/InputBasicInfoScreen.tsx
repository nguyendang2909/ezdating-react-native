import { BirthDayFormControl } from 'app/components/Form/BirthDayFormControl';
import { FormControlInput } from 'app/components/Form/FormControlInput';
import { LookingForFormControl } from 'app/components/Form/LookingForFormControl';
import { SelectGenderFormControl } from 'app/components/Form/SelectGenderForm';
import { LoadingScreen } from 'app/components/Screen/LoadingScreen';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { flexGrow } from 'app/styles';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import { Box, Button, Heading, ScrollView, View } from 'native-base';
import React, { FC } from 'react';
import * as Yup from 'yup';

export const InputBasicInfoScreen: FC = () => {
  const { data: profileData, refetch } = api.useGetMyProfileQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const profile = profileData?.data;
  const [submitUpdateProfile] = api.useUpdateProfileMutation();
  const formik = useFormik<FormParams.BasicInfo>({
    initialValues: {
      nickname: profile?.nickname || '',
      gender: profile?.gender,
      birthday: profile?.birthday,
      lookingFor: '',
      introduce: undefined,
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
        await refetch().unwrap();
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
            <ScrollView style={flexGrow}>
              <View px="4" py="4">
                <Heading>{translate('Your profile')}</Heading>
              </View>
              <View px="4">
                <View mb="4">
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

                <View mb="4">
                  <SelectGenderFormControl
                    value={formik.values.gender}
                    onChange={formik.handleChange('gender')}
                    error={formik.errors.gender}
                  />
                </View>

                <View mb="4">
                  <BirthDayFormControl
                    value={formik.values.birthday}
                    onChange={formik.handleChange('birthday')}
                    error={formik.errors.birthday}
                  />
                </View>

                <View mb="4">
                  <LookingForFormControl
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
            </ScrollView>

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
